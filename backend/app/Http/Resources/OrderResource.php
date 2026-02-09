<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'order_number' => $this->order_number,
            'status' => $this->status,
            
            // Shipping
            'shipping_name' => $this->shipping_full_name,
            'shipping_phone' => $this->shipping_phone,
            'shipping_address' => $this->formatted_shipping_address,
            'shipping_method' => $this->shipping_method,
            'tracking_number' => $this->tracking_number,
            
            // Pricing
            'subtotal' => (float) $this->subtotal,
            'shipping_cost' => (float) $this->shipping_cost,
            'tax' => (float) $this->tax,
            'discount' => (float) $this->discount,
            'total' => (float) $this->total,
            
            // Payment
            'payment_method' => $this->payment_method,
            'payment_status' => $this->payment_status,
            
            // Items
            'items' => OrderItemResource::collection($this->whenLoaded('items')),
            'items_count' => $this->items_count,
            
            // Status history
            'status_history' => OrderStatusResource::collection($this->whenLoaded('statusHistory')),
            
            // Flags
            'can_cancel' => $this->can_cancel,
            'is_completed' => $this->is_completed,
            
            // Notes
            'customer_notes' => $this->customer_notes,
            
            // Dates
            'shipped_at' => $this->shipped_at?->toIso8601String(),
            'delivered_at' => $this->delivered_at?->toIso8601String(),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
