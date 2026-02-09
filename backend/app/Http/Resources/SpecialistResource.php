<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialistResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'title' => $this->title,
            'specialty' => $this->specialty,
            'bio' => $this->bio,
            'image' => $this->image,
            'rating' => (float) $this->rating,
            'reviews_count' => $this->reviews_count,
            'consultations_count' => $this->consultations_count,
            'expertise' => $this->expertise ?? [],
            'languages' => $this->languages ?? [],
            'consultation_duration' => $this->consultation_duration,
            'consultation_fee' => (float) $this->consultation_fee,
            'is_featured' => $this->is_featured,
            'availability' => $this->when(
                $request->routeIs('specialists.show'),
                $this->availability
            ),
        ];
    }
}
