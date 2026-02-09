<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'description' => $this->description,
            'price' => (float) $this->price,
            'sale_price' => $this->sale_price ? (float) $this->sale_price : null,
            'brand' => $this->brand,
            'image' => $this->image,
            'rating' => (int) $this->rating,
            'reviews' => (int) $this->reviews_count,
            'badge' => $this->badge,
            'category' => $this->category->slug,
            'is_featured' => $this->is_featured,
            'in_stock' => $this->stock_quantity > 0,

            // Category-specific fields (conditionally included)
            'fragrance_type' => $this->when($this->fragrance_type, $this->fragrance_type),
            'scent_family' => $this->when($this->scent_family, $this->scent_family),
            'notes' => $this->when($this->fragrance_notes, $this->fragrance_notes),
            'sizes' => $this->when($this->available_sizes, $this->available_sizes),
            'finish' => $this->when($this->finish, $this->finish),
            'coverage' => $this->when($this->coverage, $this->coverage),
            'skin_types' => $this->when($this->skin_types, $this->skin_types),
            'concerns' => $this->when($this->concerns, $this->concerns),

            // Relationships
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
