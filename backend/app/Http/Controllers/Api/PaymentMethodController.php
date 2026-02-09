<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethod;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PaymentMethodController extends Controller
{
    #[OA\Get(
        path: "/payment-methods",
        summary: "Get all payment methods for the authenticated user",
        tags: ["Payment Methods"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of payment methods",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "payment_methods", type: "array", items: new OA\Items(type: "object"))
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $paymentMethods = $request->user()
            ->paymentMethods()
            ->orderByDesc('is_default')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'payment_methods' => PaymentMethodResource::collection($paymentMethods),
        ]);
    }

    #[OA\Post(
        path: "/payment-methods",
        summary: "Store a new payment method",
        tags: ["Payment Methods"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "type", type: "string", enum: ["card", "paypal", "apple_pay"], example: "card"),
                    new OA\Property(property: "card_brand", type: "string", enum: ["visa", "mastercard", "amex", "discover"]),
                    new OA\Property(property: "card_last_four", type: "string", example: "4242"),
                    new OA\Property(property: "card_exp_month", type: "string", example: "12"),
                    new OA\Property(property: "card_exp_year", type: "string", example: "2028"),
                    new OA\Property(property: "billing_name", type: "string"),
                    new OA\Property(property: "is_default", type: "boolean")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Payment method added",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "payment_method", type: "object")
                    ]
                )
            )
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'sometimes|string|in:card,paypal,apple_pay',
            'card_brand' => 'required_if:type,card|string|in:visa,mastercard,amex,discover',
            'card_last_four' => 'required_if:type,card|string|size:4',
            'card_exp_month' => 'required_if:type,card|string|size:2',
            'card_exp_year' => 'required_if:type,card|string|size:4',
            'billing_name' => 'nullable|string|max:255',
            'is_default' => 'boolean',
        ]);

        $user = $request->user();
        $isFirst = $user->paymentMethods()->count() === 0;
        if ($isFirst) {
            $validated['is_default'] = true;
        }

        $paymentMethod = $user->paymentMethods()->create($validated);

        if ($paymentMethod->is_default) {
            $paymentMethod->setAsDefault();
        }

        return response()->json([
            'message' => 'Payment method added successfully',
            'payment_method' => new PaymentMethodResource($paymentMethod),
        ], 201);
    }

    #[OA\Get(
        path: "/payment-methods/{paymentMethod}",
        summary: "Get a specific payment method",
        tags: ["Payment Methods"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "paymentMethod", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Payment method details"),
            new OA\Response(response: 404, description: "Payment method not found")
        ]
    )]
    public function show(Request $request, PaymentMethod $paymentMethod): JsonResponse
    {
        if ($paymentMethod->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Payment method not found'], 404);
        }

        return response()->json([
            'payment_method' => new PaymentMethodResource($paymentMethod),
        ]);
    }

    #[OA\Put(
        path: "/payment-methods/{paymentMethod}",
        summary: "Update a payment method",
        tags: ["Payment Methods"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "paymentMethod", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "billing_name", type: "string"),
                    new OA\Property(property: "is_default", type: "boolean")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Payment method updated"),
            new OA\Response(response: 404, description: "Payment method not found")
        ]
    )]
    public function update(Request $request, PaymentMethod $paymentMethod): JsonResponse
    {
        if ($paymentMethod->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Payment method not found'], 404);
        }

        $validated = $request->validate([
            'billing_name' => 'nullable|string|max:255',
            'is_default' => 'boolean',
        ]);

        $paymentMethod->update($validated);

        if ($request->boolean('is_default')) {
            $paymentMethod->setAsDefault();
        }

        return response()->json([
            'message' => 'Payment method updated successfully',
            'payment_method' => new PaymentMethodResource($paymentMethod->fresh()),
        ]);
    }

    #[OA\Delete(
        path: "/payment-methods/{paymentMethod}",
        summary: "Delete a payment method",
        tags: ["Payment Methods"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "paymentMethod", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Payment method deleted",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Payment method deleted successfully")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Payment method not found")
        ]
    )]
    public function destroy(Request $request, PaymentMethod $paymentMethod): JsonResponse
    {
        if ($paymentMethod->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Payment method not found'], 404);
        }

        $wasDefault = $paymentMethod->is_default;
        $paymentMethod->delete();

        if ($wasDefault) {
            $next = $request->user()->paymentMethods()->first();
            if ($next) {
                $next->update(['is_default' => true]);
            }
        }

        return response()->json([
            'message' => 'Payment method deleted successfully',
        ]);
    }

    #[OA\Post(
        path: "/payment-methods/{paymentMethod}/default",
        summary: "Set a payment method as default",
        tags: ["Payment Methods"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "paymentMethod", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Default payment method updated",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "payment_method", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Payment method not found")
        ]
    )]
    public function setDefault(Request $request, PaymentMethod $paymentMethod): JsonResponse
    {
        if ($paymentMethod->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Payment method not found'], 404);
        }

        $paymentMethod->setAsDefault();

        return response()->json([
            'message' => 'Default payment method updated',
            'payment_method' => new PaymentMethodResource($paymentMethod->fresh()),
        ]);
    }
}
