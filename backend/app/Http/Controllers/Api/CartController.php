<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use App\Http\Resources\CartItemResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA;

class CartController extends Controller
{
    #[OA\Get(
        path: "/cart",
        summary: "Get the current user's cart",
        tags: ["Cart"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "User's cart",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "cart", ref: "#/components/schemas/Cart")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated")
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $cart = Cart::getOrCreateForUser($request->user());
        $cart->load(['items.product.category']);

        return response()->json([
            'cart' => new CartResource($cart),
        ]);
    }

    #[OA\Post(
        path: "/cart",
        summary: "Add a product to the cart",
        tags: ["Cart"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["product_id"],
                properties: [
                    new OA\Property(property: "product_id", type: "integer", example: 1),
                    new OA\Property(property: "quantity", type: "integer", example: 1, minimum: 1, maximum: 10),
                    new OA\Property(property: "size", type: "string", example: "50ml", nullable: true)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Product added to cart",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Product added to cart"),
                        new OA\Property(property: "cart", ref: "#/components/schemas/Cart"),
                        new OA\Property(property: "item", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1|max:10',
            'size' => 'nullable|string|max:20',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if (!$product->is_active) {
            throw ValidationException::withMessages([
                'product_id' => ['This product is not available.'],
            ]);
        }

        $cart = Cart::getOrCreateForUser($request->user());
        $quantity = $validated['quantity'] ?? 1;
        $size = $validated['size'] ?? null;

        $existingItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('size', $size)
            ->first();

        if ($existingItem) {
            $newQuantity = min($existingItem->quantity + $quantity, 10);
            $existingItem->update(['quantity' => $newQuantity]);
            $cartItem = $existingItem;
        } else {
            $cartItem = $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'size' => $size,
                'unit_price' => $product->sale_price ?? $product->price,
            ]);
        }

        $cart->load(['items.product.category']);

        return response()->json([
            'message' => 'Product added to cart',
            'cart' => new CartResource($cart),
            'item' => new CartItemResource($cartItem->load('product')),
        ], 201);
    }

    #[OA\Put(
        path: "/cart/{cartItem}",
        summary: "Update a cart item quantity",
        tags: ["Cart"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "cartItem", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["quantity"],
                properties: [
                    new OA\Property(property: "quantity", type: "integer", example: 2, minimum: 0, maximum: 10)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Cart updated",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "cart", ref: "#/components/schemas/Cart")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Cart item not found")
        ]
    )]
    public function update(Request $request, CartItem $cartItem): JsonResponse
    {
        $cart = Cart::getOrCreateForUser($request->user());

        if ($cartItem->cart_id !== $cart->id) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:0|max:10',
        ]);

        if ($validated['quantity'] === 0) {
            $cartItem->delete();
            $message = 'Item removed from cart';
        } else {
            $cartItem->update(['quantity' => $validated['quantity']]);
            $message = 'Cart updated';
        }

        $cart->load(['items.product.category']);

        return response()->json([
            'message' => $message,
            'cart' => new CartResource($cart),
        ]);
    }

    #[OA\Delete(
        path: "/cart/{cartItem}",
        summary: "Remove a cart item",
        tags: ["Cart"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "cartItem", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Item removed",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Item removed from cart"),
                        new OA\Property(property: "cart", ref: "#/components/schemas/Cart")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Cart item not found")
        ]
    )]
    public function destroy(Request $request, CartItem $cartItem): JsonResponse
    {
        $cart = Cart::getOrCreateForUser($request->user());

        if ($cartItem->cart_id !== $cart->id) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->delete();
        $cart->load(['items.product.category']);

        return response()->json([
            'message' => 'Item removed from cart',
            'cart' => new CartResource($cart),
        ]);
    }

    #[OA\Delete(
        path: "/cart",
        summary: "Clear all items from cart",
        tags: ["Cart"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "Cart cleared",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Cart cleared"),
                        new OA\Property(property: "cart", ref: "#/components/schemas/Cart")
                    ]
                )
            )
        ]
    )]
    public function clear(Request $request): JsonResponse
    {
        $cart = Cart::getOrCreateForUser($request->user());
        $cart->clear();

        return response()->json([
            'message' => 'Cart cleared',
            'cart' => new CartResource($cart->load('items')),
        ]);
    }
}
