<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialistResource;
use App\Models\Specialist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class SpecialistController extends Controller
{
    #[OA\Get(
        path: "/specialists",
        summary: "List all active specialists",
        tags: ["Specialists"],
        parameters: [
            new OA\Parameter(name: "specialty", in: "query", description: "Filter by specialty", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "featured", in: "query", description: "Featured only", schema: new OA\Schema(type: "boolean"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of specialists",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "specialists", type: "array", items: new OA\Items(ref: "#/components/schemas/Specialist"))
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $query = Specialist::active()->orderBy('sort_order');

        if ($request->filled('specialty')) {
            $query->specialty($request->specialty);
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        $specialists = $query->get();

        return response()->json([
            'specialists' => SpecialistResource::collection($specialists),
        ]);
    }

    #[OA\Get(
        path: "/specialists/featured",
        summary: "Get featured specialists",
        tags: ["Specialists"],
        responses: [
            new OA\Response(
                response: 200,
                description: "Featured specialists",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "specialists", type: "array", items: new OA\Items(ref: "#/components/schemas/Specialist"))
                    ]
                )
            )
        ]
    )]
    public function featured(): JsonResponse
    {
        $specialists = Specialist::active()
            ->featured()
            ->orderBy('sort_order')
            ->limit(6)
            ->get();

        return response()->json([
            'specialists' => SpecialistResource::collection($specialists),
        ]);
    }

    #[OA\Get(
        path: "/specialists/{slug}",
        summary: "Get a specific specialist by slug",
        tags: ["Specialists"],
        parameters: [
            new OA\Parameter(name: "slug", in: "path", required: true, schema: new OA\Schema(type: "string"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Specialist details",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "specialist", ref: "#/components/schemas/Specialist")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Specialist not found")
        ]
    )]
    public function show(string $slug): JsonResponse
    {
        $specialist = Specialist::active()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'specialist' => new SpecialistResource($specialist),
        ]);
    }

    #[OA\Get(
        path: "/specialists/{slug}/availability",
        summary: "Get available time slots for a specialist on a given date",
        tags: ["Specialists"],
        parameters: [
            new OA\Parameter(name: "slug", in: "path", required: true, schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "date", in: "query", required: true, description: "Date (YYYY-MM-DD)", schema: new OA\Schema(type: "string", format: "date"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Available time slots",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "specialist_id", type: "string", example: "1"),
                        new OA\Property(property: "date", type: "string", format: "date"),
                        new OA\Property(property: "available_slots", type: "array", items: new OA\Items(type: "string", example: "10:00")),
                        new OA\Property(property: "duration", type: "integer", example: 30)
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Specialist not found")
        ]
    )]
    public function availability(Request $request, string $slug): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
        ]);

        $specialist = Specialist::active()
            ->where('slug', $slug)
            ->firstOrFail();

        $slots = $specialist->getAvailableSlotsForDate($validated['date']);

        return response()->json([
            'specialist_id' => (string) $specialist->id,
            'date' => $validated['date'],
            'available_slots' => $slots,
            'duration' => $specialist->consultation_duration,
        ]);
    }
}
