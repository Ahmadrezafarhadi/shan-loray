<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'booking_reference' => $this->booking_reference,
            'type' => $this->type,
            'status' => $this->status,
            'scheduled_date' => $this->scheduled_date->toDateString(),
            'scheduled_time' => $this->scheduled_time,
            'duration' => $this->duration,
            'customer_name' => $this->customer_name,
            'customer_email' => $this->customer_email,
            'concern_area' => $this->concern_area,
            'customer_notes' => $this->customer_notes,
            'meeting_link' => $this->when(
                in_array($this->status, ['confirmed', 'in_progress']),
                $this->meeting_link
            ),
            'fee' => (float) $this->fee,
            'payment_status' => $this->payment_status,
            'rating' => $this->rating,
            'review' => $this->review,
            'can_cancel' => $this->can_cancel,
            'can_reschedule' => $this->can_reschedule,
            'can_rate' => $this->can_rate,
            'is_upcoming' => $this->is_upcoming,
            'specialist' => new SpecialistResource($this->whenLoaded('specialist')),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
