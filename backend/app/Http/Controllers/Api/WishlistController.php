<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Resources\WishlistResource;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class WishlistController extends Controller
{
    #[OA\Get(
        path: "/wishlist",
        summary: "Get the current user's wishlist",
        tags: ["Wishlist"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "User's wishlist",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "wishlist", type: "array", items: new OA\Items(type: "object")),
                        new OA\Property(property: "count", type: "integer", example: 5)
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $wishlistItems = Wishlist::where('user_id', $request->user()->id)
            ->with(['product.category'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'wishlist' => WishlistResource::collection($wishlistItems),
            'count' => $wishlistItems->count(),
        ]);
    }

    #[OA\Post(
        path: "/wishlist/toggle",
        summary: "Toggle a product in the wishlist (add/remove)",
        tags: ["Wishlist"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["product_id"],
                properties: [
                    new OA\Property(property: "product_id", type: "integer", example: 1)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Wishlist toggled",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "in_wishlist", type: "boolean"),
                        new OA\Property(property: "product", ref: "#/components/schemas/Product")
                    ]
                )
            )
        ]
    )]
    public function toggle(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $userId = $request->user()->id;

        $added = Wishlist::toggle($userId, $product->id);

        return response()->json([
            'message' => $added ? 'Added to wishlist' : 'Removed from wishlist',
            'in_wishlist' => $added,
            'product' => new ProductResource($product->load('category')),
        ]);
    }

    #[OA\Post(
        path: "/wishlist",
        summary: "Add a product to the wishlist",
        tags: ["Wishlist"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["product_id"],
                properties: [
                    new OA\Property(property: "product_id", type: "integer", example: 1)
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Added to wishlist",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Added to wishlist"),
                        new OA\Property(property: "in_wishlist", type: "boolean", example: true),
                        new OA\Property(property: "product", ref: "#/components/schemas/Product")
                    ]
                )
            )
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $userId = $request->user()->id;
        $productId = $validated['product_id'];

        if (Wishlist::isInWishlist($userId, $productId)) {
            return response()->json([
                'message' => 'Product already in wishlist',
                'in_wishlist' => true,
            ]);
        }

        Wishlist::create([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);

        $product = Product::with('category')->find($productId);

        return response()->json([
            'message' => 'Added to wishlist',
            'in_wishlist' => true,
            'product' => new ProductResource($product),
        ], 201);
    }

    #[OA\Delete(
        path: "/wishlist/{product}",
        summary: "Remove a product from the wishlist",
        tags: ["Wishlist"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "product", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Removed from wishlist",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "in_wishlist", type: "boolean", example: false)
                    ]
                )
            )
        ]
    )]
    public function destroy(Request $request, Product $product): JsonResponse
    {
        $userId = $request->user()->id;

        $deleted = Wishlist::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->delete();

        return response()->json([
            'message' => $deleted ? 'Removed from wishlist' : 'Product was not in wishlist',
            'in_wishlist' => false,
        ]);
    }

    #[OA\Get(
        path: "/wishlist/check/{product}",
        summary: "Check if a product is in the wishlist",
        tags: ["Wishlist"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "product", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Wishlist check result",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "in_wishlist", type: "boolean")
                    ]
                )
            )
        ]
    )]
    public function check(Request $request, Product $product): JsonResponse
    {
        $inWishlist = Wishlist::isInWishlist($request->user()->id, $product->id);

        return response()->json([
            'in_wishlist' => $inWishlist,
        ]);
    }

    #[OA\Get(
        path: "/wishlist/ids",
        summary: "Get wishlist product IDs for quick client-side checking",
        tags: ["Wishlist"],
        security: [["bearerAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "Product IDs in wishlist",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "product_ids", type: "array", items: new OA\Items(type: "string"))
                    ]
                )
            )
        ]
    )]
    public function ids(Request $request): JsonResponse
    {
        $productIds = Wishlist::where('user_id', $request->user()->id)
            ->pluck('product_id')
            ->map(fn ($id) => (string) $id);

        return response()->json([
            'product_ids' => $productIds,
        ]);
    }
}
