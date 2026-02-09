<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class ProductController extends Controller
{
    #[OA\Get(
        path: "/products",
        summary: "Get products with filtering and sorting",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "category", in: "query", description: "Filter by category slug", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "min_price", in: "query", description: "Minimum price", schema: new OA\Schema(type: "number")),
            new OA\Parameter(name: "max_price", in: "query", description: "Maximum price", schema: new OA\Schema(type: "number")),
            new OA\Parameter(name: "sort", in: "query", description: "Sort order", schema: new OA\Schema(type: "string", enum: ["bestselling", "newest", "price_low", "price_high", "rating"])),
            new OA\Parameter(name: "badge", in: "query", description: "Filter by badge", schema: new OA\Schema(type: "string", enum: ["bestseller", "new", "limited", "signature"])),
            new OA\Parameter(name: "featured", in: "query", description: "Featured only", schema: new OA\Schema(type: "boolean")),
            new OA\Parameter(name: "search", in: "query", description: "Search term", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "per_page", in: "query", description: "Items per page (max 50)", schema: new OA\Schema(type: "integer", default: 12))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Paginated product list",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "products", type: "array", items: new OA\Items(ref: "#/components/schemas/Product")),
                        new OA\Property(property: "meta", ref: "#/components/schemas/Pagination")
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category')->active();

        if ($request->filled('category')) {
            $query->inCategory($request->category);
        }

        if ($request->filled('min_price') || $request->filled('max_price')) {
            $query->priceRange($request->min_price, $request->max_price);
        }

        if ($request->filled('badge')) {
            $query->where('badge', $request->badge);
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('skin_types')) {
            $skinTypes = is_array($request->skin_types) ? $request->skin_types : explode(',', $request->skin_types);
            $query->where(function ($q) use ($skinTypes) {
                foreach ($skinTypes as $type) {
                    $q->orWhereJsonContains('skin_types', $type);
                }
            });
        }

        if ($request->filled('concerns')) {
            $concerns = is_array($request->concerns) ? $request->concerns : explode(',', $request->concerns);
            $query->where(function ($q) use ($concerns) {
                foreach ($concerns as $concern) {
                    $q->orWhereJsonContains('concerns', $concern);
                }
            });
        }

        if ($request->filled('finish')) {
            $query->where('finish', $request->finish);
        }

        if ($request->filled('coverage')) {
            $query->where('coverage', $request->coverage);
        }

        if ($request->filled('scent_family')) {
            $query->where('scent_family', $request->scent_family);
        }

        if ($request->filled('fragrance_type')) {
            $query->where('fragrance_type', $request->fragrance_type);
        }

        switch ($request->get('sort', 'bestselling')) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'bestselling':
            default:
                $query->orderByRaw("CASE WHEN badge = 'bestseller' THEN 0 ELSE 1 END")
                    ->orderBy('reviews_count', 'desc');
                break;
        }

        $perPage = min((int) $request->get('per_page', 12), 50);
        $products = $query->paginate($perPage);

        return response()->json([
            'products' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    #[OA\Get(
        path: "/products/featured",
        summary: "Get featured products for homepage",
        tags: ["Products"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Featured products",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "products", type: "array", items: new OA\Items(ref: "#/components/schemas/Product"))
                    ]
                )
            )
        ]
    )]
    public function featured(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->featured()
            ->orderBy('sort_order')
            ->take(8)
            ->get();

        return response()->json([
            'products' => ProductResource::collection($products),
        ]);
    }

    #[OA\Get(
        path: "/products/bestsellers",
        summary: "Get bestseller products",
        tags: ["Products"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Bestseller products",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "products", type: "array", items: new OA\Items(ref: "#/components/schemas/Product"))
                    ]
                )
            )
        ]
    )]
    public function bestsellers(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->where('badge', 'bestseller')
            ->orderBy('reviews_count', 'desc')
            ->take(8)
            ->get();

        return response()->json([
            'products' => ProductResource::collection($products),
        ]);
    }

    #[OA\Get(
        path: "/products/new-arrivals",
        summary: "Get new arrival products",
        tags: ["Products"],
        responses: [
            new OA\Response(
                response: 200,
                description: "New arrival products",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "products", type: "array", items: new OA\Items(ref: "#/components/schemas/Product"))
                    ]
                )
            )
        ]
    )]
    public function newArrivals(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->where('badge', 'new')
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();

        return response()->json([
            'products' => ProductResource::collection($products),
        ]);
    }

    #[OA\Get(
        path: "/products/search",
        summary: "Search products",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "q", in: "query", required: true, description: "Search query (min 2 chars)", schema: new OA\Schema(type: "string"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Search results",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "products", type: "array", items: new OA\Items(ref: "#/components/schemas/Product")),
                        new OA\Property(property: "query", type: "string"),
                        new OA\Property(property: "count", type: "integer")
                    ]
                )
            )
        ]
    )]
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q', '');

        if (strlen($query) < 2) {
            return response()->json([
                'products' => [],
                'message' => 'Search query must be at least 2 characters',
            ]);
        }

        $products = Product::with('category')
            ->active()
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('brand', 'like', "%{$query}%");
            })
            ->orderBy('reviews_count', 'desc')
            ->take(20)
            ->get();

        return response()->json([
            'products' => ProductResource::collection($products),
            'query' => $query,
            'count' => $products->count(),
        ]);
    }

    #[OA\Get(
        path: "/products/{slug}",
        summary: "Get a single product by slug",
        tags: ["Products"],
        parameters: [
            new OA\Parameter(name: "slug", in: "path", required: true, schema: new OA\Schema(type: "string"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Product details",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "product", ref: "#/components/schemas/Product")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Product not found")
        ]
    )]
    public function show(string $slug): JsonResponse
    {
        $product = Product::with(['category', 'images'])
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        return response()->json([
            'product' => new ProductResource($product),
        ]);
    }
}
