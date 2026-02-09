<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'items' => CartItemResource::collection($this->whenLoaded('items')),
            'items_count' => $this->items_count,
            'subtotal' => (float) $this->subtotal,
            'is_empty' => $this->is_empty,
        ];
    }
}
