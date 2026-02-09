<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA;

class ProfileController extends Controller
{
    #[OA\Get(
        path: "/profile",
        summary: "Get the authenticated user's profile",
        tags: ["Profile"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "User profile",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "user", ref: "#/components/schemas/User"),
                        new OA\Property(property: "default_address", ref: "#/components/schemas/Address", nullable: true),
                        new OA\Property(property: "default_payment_method", type: "object", nullable: true)
                    ]
                )
            )
        ]
    )]
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load(['defaultAddress', 'defaultPaymentMethod']);

        return response()->json([
            'user' => new UserResource($user),
            'default_address' => $user->defaultAddress,
            'default_payment_method' => $user->defaultPaymentMethod,
        ]);
    }

    #[OA\Put(
        path: "/profile",
        summary: "Update the authenticated user's profile",
        tags: ["Profile"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "first_name", type: "string", example: "Jane"),
                    new OA\Property(property: "last_name", type: "string", example: "Doe"),
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "phone", type: "string"),
                    new OA\Property(property: "avatar", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Profile updated",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Profile updated successfully"),
                        new OA\Property(property: "user", ref: "#/components/schemas/User")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'phone' => 'nullable|string|max:50',
            'avatar' => 'nullable|string|max:255',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => new UserResource($user),
        ]);
    }

    #[OA\Put(
        path: "/profile/password",
        summary: "Update the authenticated user's password",
        tags: ["Profile"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["current_password", "password", "password_confirmation"],
                properties: [
                    new OA\Property(property: "current_password", type: "string", format: "password"),
                    new OA\Property(property: "password", type: "string", format: "password", minLength: 8),
                    new OA\Property(property: "password_confirmation", type: "string", format: "password")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Password updated",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Password updated successfully")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Validation error or incorrect password")
        ]
    )]
    public function updatePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }

    #[OA\Delete(
        path: "/profile",
        summary: "Delete the authenticated user's account",
        tags: ["Profile"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["password"],
                properties: [
                    new OA\Property(property: "password", type: "string", format: "password")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Account deleted",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Account deleted successfully")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Incorrect password")
        ]
    )]
    public function destroy(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        if (!Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['The password is incorrect.'],
            ]);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'message' => 'Account deleted successfully',
        ]);
    }
}
