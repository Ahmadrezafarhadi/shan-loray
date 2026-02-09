<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CollectionResource;
use App\Models\Collection;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class CollectionController extends Controller
{
    #[OA\Get(
        path: "/collections",
        summary: "Get all active collections",
        tags: ["Collections"],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of collections",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "collections", type: "array", items: new OA\Items(type: "object"))
                    ]
                )
            )
        ]
    )]
    public function index(): JsonResponse
    {
        $collections = Collection::active()
            ->orderBy('sort_order')
            ->withCount('products')
            ->get();

        return response()->json([
            'collections' => CollectionResource::collection($collections),
        ]);
    }

    #[OA\Get(
        path: "/collections/featured",
        summary: "Get featured collections for homepage",
        tags: ["Collections"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Featured collections",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "collections", type: "array", items: new OA\Items(type: "object"))
                    ]
                )
            )
        ]
    )]
    public function featured(): JsonResponse
    {
        $collections = Collection::active()
            ->featured()
            ->orderBy('sort_order')
            ->withCount('products')
            ->take(4)
            ->get();

        return response()->json([
            'collections' => CollectionResource::collection($collections),
        ]);
    }

    #[OA\Get(
        path: "/collections/{slug}",
        summary: "Get a single collection with its products",
        tags: ["Collections"],
        parameters: [
            new OA\Parameter(name: "slug", in: "path", required: true, schema: new OA\Schema(type: "string"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Collection with products",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "collection", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Collection not found")
        ]
    )]
    public function show(string $slug): JsonResponse
    {
        $collection = Collection::where('slug', $slug)
            ->active()
            ->with(['products' => function ($query) {
                $query->where('is_active', true)
                    ->with('category')
                    ->orderByPivot('sort_order');
            }])
            ->firstOrFail();

        return response()->json([
            'collection' => new CollectionResource($collection),
        ]);
    }
}
