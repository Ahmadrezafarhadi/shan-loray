<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
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
            'product_id' => (string) $this->product_id,
            'product_name' => $this->product_name,
            'product_slug' => $this->product_slug,
            'product_image' => $this->product_image,
            'product_brand' => $this->product_brand,
            'size' => $this->size,
            'quantity' => $this->quantity,
            'unit_price' => (float) $this->unit_price,
            'total' => (float) $this->total,
        ];
    }
}
