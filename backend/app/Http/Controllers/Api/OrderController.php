<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA;

class OrderController extends Controller
{
    #[OA\Get(
        path: "/orders",
        summary: "Get authenticated user's orders",
        tags: ["Orders"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "status", in: "query", description: "Filter by status", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "per_page", in: "query", description: "Items per page", schema: new OA\Schema(type: "integer", default: 10))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of orders",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "orders", type: "array", items: new OA\Items(ref: "#/components/schemas/Order")),
                        new OA\Property(property: "meta", ref: "#/components/schemas/Pagination")
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $query = Order::forUser($request->user()->id)
            ->with('items')
            ->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->status($request->status);
        }

        $perPage = min((int) $request->get('per_page', 10), 50);
        $orders = $query->paginate($perPage);

        return response()->json([
            'orders' => OrderResource::collection($orders),
            'meta' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
        ]);
    }

    #[OA\Get(
        path: "/orders/{order}",
        summary: "Get a specific order",
        tags: ["Orders"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "order", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Order details",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "order", ref: "#/components/schemas/Order")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Order not found")
        ]
    )]
    public function show(Request $request, Order $order): JsonResponse
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->load(['items', 'statusHistory']);

        return response()->json([
            'order' => new OrderResource($order),
        ]);
    }

    #[OA\Post(
        path: "/orders",
        summary: "Create an order from the user's cart (Checkout)",
        tags: ["Orders"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["shipping_address_id", "payment_method"],
                properties: [
                    new OA\Property(property: "shipping_address_id", type: "integer", example: 1),
                    new OA\Property(property: "billing_address_id", type: "integer", nullable: true),
                    new OA\Property(property: "payment_method", type: "string", enum: ["card", "paypal", "cod"]),
                    new OA\Property(property: "shipping_method", type: "string", example: "standard"),
                    new OA\Property(property: "customer_notes", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Order placed successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Order placed successfully"),
                        new OA\Property(property: "order", ref: "#/components/schemas/Order")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Validation error or empty cart")
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'shipping_address_id' => 'required|exists:addresses,id',
            'billing_address_id' => 'nullable|exists:addresses,id',
            'payment_method' => 'required|string|in:card,paypal,cod',
            'shipping_method' => 'sometimes|string|max:50',
            'customer_notes' => 'nullable|string|max:1000',
        ]);

        $user = $request->user();
        $cart = Cart::getOrCreateForUser($user);
        $cart->load('items.product');

        if ($cart->is_empty) {
            throw ValidationException::withMessages([
                'cart' => ['Your cart is empty.'],
            ]);
        }

        $shippingAddress = Address::where('id', $validated['shipping_address_id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $billingAddress = null;
        if (!empty($validated['billing_address_id'])) {
            $billingAddress = Address::where('id', $validated['billing_address_id'])
                ->where('user_id', $user->id)
                ->first();
        }

        $subtotal = $cart->subtotal;
        $shippingCost = $this->calculateShipping($subtotal, $validated['shipping_method'] ?? 'standard');
        $tax = $this->calculateTax($subtotal);
        $discount = 0;
        $total = $subtotal + $shippingCost + $tax - $discount;

        try {
            DB::beginTransaction();

            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'user_id' => $user->id,
                'status' => 'pending',
                'shipping_first_name' => $shippingAddress->first_name,
                'shipping_last_name' => $shippingAddress->last_name,
                'shipping_phone' => $shippingAddress->phone,
                'shipping_address_line_1' => $shippingAddress->address_line_1,
                'shipping_address_line_2' => $shippingAddress->address_line_2,
                'shipping_city' => $shippingAddress->city,
                'shipping_state' => $shippingAddress->state,
                'shipping_postal_code' => $shippingAddress->postal_code,
                'shipping_country' => $shippingAddress->country,
                'billing_first_name' => $billingAddress?->first_name ?? $shippingAddress->first_name,
                'billing_last_name' => $billingAddress?->last_name ?? $shippingAddress->last_name,
                'billing_address_line_1' => $billingAddress?->address_line_1 ?? $shippingAddress->address_line_1,
                'billing_city' => $billingAddress?->city ?? $shippingAddress->city,
                'billing_postal_code' => $billingAddress?->postal_code ?? $shippingAddress->postal_code,
                'billing_country' => $billingAddress?->country ?? $shippingAddress->country,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'tax' => $tax,
                'discount' => $discount,
                'total' => $total,
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'pending',
                'shipping_method' => $validated['shipping_method'] ?? 'standard',
                'customer_notes' => $validated['customer_notes'] ?? null,
            ]);

            foreach ($cart->items as $cartItem) {
                $order->items()->create(
                    OrderItem::createFromCartItem($cartItem)
                );
            }

            $order->addStatusUpdate(
                'pending',
                'Order Placed',
                'Your order has been received and is being processed.'
            );

            $cart->clear();

            DB::commit();

            $order->load(['items', 'statusHistory']);

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => new OrderResource($order),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    #[OA\Post(
        path: "/orders/{order}/cancel",
        summary: "Cancel an order",
        tags: ["Orders"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "order", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "reason", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Order cancelled",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "order", ref: "#/components/schemas/Order")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Order cannot be cancelled")
        ]
    )]
    public function cancel(Request $request, Order $order): JsonResponse
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validated = $request->validate([
            'reason' => 'nullable|string|max:500',
        ]);

        if (!$order->cancel($validated['reason'] ?? null)) {
            return response()->json([
                'message' => 'This order cannot be cancelled',
            ], 422);
        }

        $order->load(['items', 'statusHistory']);

        return response()->json([
            'message' => 'Order cancelled successfully',
            'order' => new OrderResource($order),
        ]);
    }

    #[OA\Get(
        path: "/orders/{order}/track",
        summary: "Get order tracking information",
        tags: ["Orders"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "order", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Order tracking info",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "order_number", type: "string"),
                        new OA\Property(property: "status", type: "string"),
                        new OA\Property(property: "tracking_number", type: "string", nullable: true),
                        new OA\Property(property: "shipped_at", type: "string", format: "date-time", nullable: true),
                        new OA\Property(property: "delivered_at", type: "string", format: "date-time", nullable: true),
                        new OA\Property(property: "timeline", type: "array", items: new OA\Items(type: "object"))
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Order not found")
        ]
    )]
    public function track(Request $request, Order $order): JsonResponse
    {
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->load('statusHistory');

        return response()->json([
            'order_number' => $order->order_number,
            'status' => $order->status,
            'tracking_number' => $order->tracking_number,
            'shipped_at' => $order->shipped_at?->toIso8601String(),
            'delivered_at' => $order->delivered_at?->toIso8601String(),
            'timeline' => $order->statusHistory->map(function ($status) {
                return [
                    'status' => $status->status,
                    'title' => $status->title,
                    'description' => $status->description,
                    'location' => $status->location,
                    'icon' => $status->icon,
                    'occurred_at' => $status->occurred_at->toIso8601String(),
                ];
            }),
        ]);
    }

    private function calculateShipping(float $subtotal, string $method): float
    {
        if ($subtotal >= 200) {
            return 0;
        }

        return match ($method) {
            'express' => 25.00,
            'same_day' => 50.00,
            default => 15.00,
        };
    }

    private function calculateTax(float $subtotal): float
    {
        return round($subtotal * 0.05, 2);
    }
}
