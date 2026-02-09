<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use OpenApi\Attributes as OA;

class CategoryController extends Controller
{
    #[OA\Get(
        path: "/categories",
        summary: "Get all active categories",
        tags: ["Categories"],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of categories",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "categories", type: "array", items: new OA\Items(ref: "#/components/schemas/Category"))
                    ]
                )
            )
        ]
    )]
    public function index(): JsonResponse
    {
        $categories = Category::active()
            ->orderBy('sort_order')
            ->withCount(['products' => function ($query) {
                $query->where('is_active', true);
            }])
            ->get();

        return response()->json([
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    #[OA\Get(
        path: "/categories/{slug}",
        summary: "Get a single category by slug",
        tags: ["Categories"],
        parameters: [
            new OA\Parameter(name: "slug", in: "path", required: true, schema: new OA\Schema(type: "string"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Category details",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "category", ref: "#/components/schemas/Category")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Category not found")
        ]
    )]
    public function show(string $slug): JsonResponse
    {
        $category = Category::where('slug', $slug)
            ->active()
            ->withCount(['products' => function ($query) {
                $query->where('is_active', true);
            }])
            ->firstOrFail();

        return response()->json([
            'category' => new CategoryResource($category),
        ]);
    }
}
