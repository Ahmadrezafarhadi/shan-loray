<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConsultationResource;
use App\Models\Consultation;
use App\Models\Specialist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA;

class ConsultationController extends Controller
{
    #[OA\Get(
        path: "/consultations",
        summary: "List user's consultations",
        tags: ["Consultations"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "status", in: "query", description: "Filter by status", schema: new OA\Schema(type: "string")),
            new OA\Parameter(name: "upcoming", in: "query", description: "Upcoming only", schema: new OA\Schema(type: "boolean")),
            new OA\Parameter(name: "per_page", in: "query", schema: new OA\Schema(type: "integer", default: 10))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of consultations",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "consultations", type: "array", items: new OA\Items(ref: "#/components/schemas/Consultation")),
                        new OA\Property(property: "meta", ref: "#/components/schemas/Pagination")
                    ]
                )
            )
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $query = Consultation::forUser($request->user()->id)
            ->with('specialist')
            ->orderBy('scheduled_date', 'desc')
            ->orderBy('scheduled_time', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->boolean('upcoming')) {
            $query->upcoming();
        }

        $perPage = min((int) $request->get('per_page', 10), 50);
        $consultations = $query->paginate($perPage);

        return response()->json([
            'consultations' => ConsultationResource::collection($consultations),
            'meta' => [
                'current_page' => $consultations->currentPage(),
                'last_page' => $consultations->lastPage(),
                'per_page' => $consultations->perPage(),
                'total' => $consultations->total(),
            ],
        ]);
    }

    #[OA\Post(
        path: "/consultations",
        summary: "Book a new consultation",
        tags: ["Consultations"],
        security: [["bearerAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["specialist_id", "scheduled_date", "scheduled_time"],
                properties: [
                    new OA\Property(property: "specialist_id", type: "integer", example: 1),
                    new OA\Property(property: "type", type: "string", enum: ["video", "in_person", "chat"], example: "video"),
                    new OA\Property(property: "scheduled_date", type: "string", format: "date", example: "2026-02-10"),
                    new OA\Property(property: "scheduled_time", type: "string", example: "10:00"),
                    new OA\Property(property: "concern_area", type: "string"),
                    new OA\Property(property: "customer_notes", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description: "Consultation booked",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Consultation booked successfully"),
                        new OA\Property(property: "consultation", ref: "#/components/schemas/Consultation")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Time slot not available")
        ]
    )]
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'specialist_id' => 'required|exists:specialists,id',
            'type' => 'sometimes|in:video,in_person,chat',
            'scheduled_date' => 'required|date|after_or_equal:today',
            'scheduled_time' => 'required|date_format:H:i',
            'concern_area' => 'nullable|string|max:100',
            'customer_notes' => 'nullable|string|max:1000',
        ]);

        $user = $request->user();
        $specialist = Specialist::active()->findOrFail($validated['specialist_id']);

        if (!$specialist->isAvailableAt($validated['scheduled_date'], $validated['scheduled_time'])) {
            throw ValidationException::withMessages([
                'scheduled_time' => ['This time slot is not available.'],
            ]);
        }

        $consultation = Consultation::create([
            'booking_reference' => Consultation::generateBookingReference(),
            'user_id' => $user->id,
            'specialist_id' => $specialist->id,
            'type' => $validated['type'] ?? 'video',
            'status' => 'pending',
            'scheduled_date' => $validated['scheduled_date'],
            'scheduled_time' => $validated['scheduled_time'],
            'duration' => $specialist->consultation_duration,
            'customer_name' => $user->full_name,
            'customer_email' => $user->email,
            'customer_phone' => $user->phone,
            'concern_area' => $validated['concern_area'] ?? null,
            'customer_notes' => $validated['customer_notes'] ?? null,
            'fee' => $specialist->consultation_fee,
            'payment_status' => $specialist->consultation_fee > 0 ? 'pending' : 'paid',
            'meeting_link' => 'https://meet.shanloray.com/' . Consultation::generateBookingReference(),
        ]);

        $consultation->load('specialist');

        return response()->json([
            'message' => 'Consultation booked successfully',
            'consultation' => new ConsultationResource($consultation),
        ], 201);
    }

    #[OA\Get(
        path: "/consultations/{consultation}",
        summary: "Get a specific consultation",
        tags: ["Consultations"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "consultation", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Consultation details",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "consultation", ref: "#/components/schemas/Consultation")
                    ]
                )
            ),
            new OA\Response(response: 404, description: "Consultation not found")
        ]
    )]
    public function show(Request $request, Consultation $consultation): JsonResponse
    {
        if ($consultation->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Consultation not found'], 404);
        }

        $consultation->load('specialist');

        return response()->json([
            'consultation' => new ConsultationResource($consultation),
        ]);
    }

    #[OA\Post(
        path: "/consultations/{consultation}/cancel",
        summary: "Cancel a consultation",
        tags: ["Consultations"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "consultation", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: "Consultation cancelled",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "consultation", ref: "#/components/schemas/Consultation")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Cannot be cancelled")
        ]
    )]
    public function cancel(Request $request, Consultation $consultation): JsonResponse
    {
        if ($consultation->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Consultation not found'], 404);
        }

        if (!$consultation->cancel()) {
            return response()->json([
                'message' => 'This consultation cannot be cancelled',
            ], 422);
        }

        $consultation->load('specialist');

        return response()->json([
            'message' => 'Consultation cancelled successfully',
            'consultation' => new ConsultationResource($consultation),
        ]);
    }

    #[OA\Post(
        path: "/consultations/{consultation}/reschedule",
        summary: "Reschedule a consultation",
        tags: ["Consultations"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "consultation", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["scheduled_date", "scheduled_time"],
                properties: [
                    new OA\Property(property: "scheduled_date", type: "string", format: "date"),
                    new OA\Property(property: "scheduled_time", type: "string", example: "14:00")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Consultation rescheduled",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string"),
                        new OA\Property(property: "consultation", ref: "#/components/schemas/Consultation")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Cannot be rescheduled or time not available")
        ]
    )]
    public function reschedule(Request $request, Consultation $consultation): JsonResponse
    {
        if ($consultation->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Consultation not found'], 404);
        }

        if (!$consultation->can_reschedule) {
            return response()->json([
                'message' => 'This consultation cannot be rescheduled',
            ], 422);
        }

        $validated = $request->validate([
            'scheduled_date' => 'required|date|after_or_equal:today',
            'scheduled_time' => 'required|date_format:H:i',
        ]);

        $specialist = $consultation->specialist;

        if (!$specialist->isAvailableAt($validated['scheduled_date'], $validated['scheduled_time'])) {
            throw ValidationException::withMessages([
                'scheduled_time' => ['This time slot is not available.'],
            ]);
        }

        $consultation->update([
            'scheduled_date' => $validated['scheduled_date'],
            'scheduled_time' => $validated['scheduled_time'],
        ]);

        $consultation->load('specialist');

        return response()->json([
            'message' => 'Consultation rescheduled successfully',
            'consultation' => new ConsultationResource($consultation),
        ]);
    }

    #[OA\Post(
        path: "/consultations/{consultation}/rate",
        summary: "Rate a completed consultation",
        tags: ["Consultations"],
        security: [["bearerAuth" => []]],
        parameters: [
            new OA\Parameter(name: "consultation", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["rating"],
                properties: [
                    new OA\Property(property: "rating", type: "integer", minimum: 1, maximum: 5, example: 5),
                    new OA\Property(property: "review", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Rating submitted",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "message", type: "string", example: "Thank you for your feedback"),
                        new OA\Property(property: "consultation", ref: "#/components/schemas/Consultation")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Cannot be rated")
        ]
    )]
    public function rate(Request $request, Consultation $consultation): JsonResponse
    {
        if ($consultation->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Consultation not found'], 404);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        if (!$consultation->rate($validated['rating'], $validated['review'] ?? null)) {
            return response()->json([
                'message' => 'This consultation cannot be rated',
            ], 422);
        }

        $consultation->load('specialist');

        return response()->json([
            'message' => 'Thank you for your feedback',
            'consultation' => new ConsultationResource($consultation),
        ]);
    }
}
