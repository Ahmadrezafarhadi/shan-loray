<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderStatusResource extends JsonResource
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
            'status' => $this->status,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'icon' => $this->icon,
            'occurred_at' => $this->occurred_at->toIso8601String(),
        ];
    }
}
