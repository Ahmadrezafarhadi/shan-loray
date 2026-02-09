<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AddressResource;
use App\Models\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class AddressController extends Controller
{
    #[OA\Get(
        path: "/addresses",
        summary: "Get all addresses for the authenticated user",
        tags: ["Addresses"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of addresses",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "addresses", type: "array", items: new OA\Items(ref: "#/components/schemas/Address"))
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $addresses = $request->user()
            ->addresses()
            ->orderByDesc('is_default')
            ->orderBy('label')
            ->get();

        return response()->json([
            'addresses' => AddressResource::collection($addresses),
        ]);
    }

    #[OA\Post(
        path: "/addresses",
        summary: "Create a new address",
        tags: ["Addresses"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["first_name", "last_name", "address_line_1", "city", "postal_code"],
                properties: [
                    new OA\Property(property: "label", type: "string", example: "Home"),
                    new OA\Property(property: "first_name", type: "string", example: "Jane"),
                    new OA\Property(property: "last_name", type: "string", example: "Doe"),
                    new OA\Property(property: "phone", type: "string"),
                    new OA\Property(property: "address_line_1", type: "string", example: "123 Palm Street"),
                    new OA\Property(property: "address_line_2", type: "string"),
                    new OA\Property(property: "city", type: "string", example: "Dubai"),
                    new OA\Property(property: "state", type: "string"),
                    new OA\Property(property: "postal_code", type: "string", example: "12345"),
                    new OA\Property(property: "country", type: "string", example: "AE"),
                    new OA\Property(property: "is_default", type: "boolean"),
                    new OA\Property(property: "is_billing", type: "boolean")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Address created",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Address created successfully"),
                        new OA\Property(property: "address", ref: "#/components/schemas/Address")
                    ]
                )
            )
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'label' => 'sometimes|string|max:50',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'sometimes|string|max:2',
            'is_default' => 'boolean',
            'is_billing' => 'boolean',
        ]);

        $user = $request->user();
        $isFirst = $user->addresses()->count() === 0;
        if ($isFirst) {
            $validated['is_default'] = true;
            $validated['is_billing'] = true;
        }

        $address = $user->addresses()->create($validated);

        if ($address->is_default) {
            $address->setAsDefault();
        }
        if ($address->is_billing) {
            $address->setAsBilling();
        }

        return response()->json([
            'message' => 'Address created successfully',
            'address' => new AddressResource($address),
        ], 201);
    }

    #[OA\Get(
        path: "/addresses/{address}",
        summary: "Get a specific address",
        tags: ["Addresses"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "address", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Address details",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "address", ref: "#/components/schemas/Address")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Address not found")
        ]
    )]
    public function show(Request $request, Address $address): JsonResponse
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        return response()->json([
            'address' => new AddressResource($address),
        ]);
    }

    #[OA\Put(
        path: "/addresses/{address}",
        summary: "Update an address",
        tags: ["Addresses"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "address", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "label", type: "string"),
                    new OA\Property(property: "first_name", type: "string"),
                    new OA\Property(property: "last_name", type: "string"),
                    new OA\Property(property: "address_line_1", type: "string"),
                    new OA\Property(property: "city", type: "string"),
                    new OA\Property(property: "postal_code", type: "string"),
                    new OA\Property(property: "is_default", type: "boolean")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Address updated",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "address", ref: "#/components/schemas/Address")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Address not found")
        ]
    )]
    public function update(Request $request, Address $address): JsonResponse
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $validated = $request->validate([
            'label' => 'sometimes|string|max:50',
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:50',
            'address_line_1' => 'sometimes|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'sometimes|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'sometimes|string|max:20',
            'country' => 'sometimes|string|max:2',
            'is_default' => 'boolean',
            'is_billing' => 'boolean',
        ]);

        $address->update($validated);

        if ($request->boolean('is_default')) {
            $address->setAsDefault();
        }
        if ($request->boolean('is_billing')) {
            $address->setAsBilling();
        }

        return response()->json([
            'message' => 'Address updated successfully',
            'address' => new AddressResource($address->fresh()),
        ]);
    }

    #[OA\Delete(
        path: "/addresses/{address}",
        summary: "Delete an address",
        tags: ["Addresses"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "address", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Address deleted",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Address deleted successfully")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Address not found")
        ]
    )]
    public function destroy(Request $request, Address $address): JsonResponse
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $wasDefault = $address->is_default;
        $wasBilling = $address->is_billing;

        $address->delete();

        if ($wasDefault || $wasBilling) {
            $nextAddress = $request->user()->addresses()->first();
            if ($nextAddress) {
                if ($wasDefault) {
                    $nextAddress->update(['is_default' => true]);
                }
                if ($wasBilling) {
                    $nextAddress->update(['is_billing' => true]);
                }
            }
        }

        return response()->json([
            'message' => 'Address deleted successfully',
        ]);
    }

    #[OA\Post(
        path: "/addresses/{address}/default",
        summary: "Set an address as default",
        tags: ["Addresses"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "address", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Default address updated",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "address", ref: "#/components/schemas/Address")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Address not found")
        ]
    )]
    public function setDefault(Request $request, Address $address): JsonResponse
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Address not found'], 404);
        }

        $address->setAsDefault();

        return response()->json([
            'message' => 'Default address updated',
            'address' => new AddressResource($address->fresh()),
        ]);
    }
}
