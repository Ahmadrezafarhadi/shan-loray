<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentMethodResource extends JsonResource
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
            'type' => $this->type,
            'card_brand' => $this->card_brand,
            'card_last_four' => $this->card_last_four,
            'masked_card' => $this->masked_card,
            'expiry_date' => $this->expiry_date,
            'billing_name' => $this->billing_name,
            'is_default' => $this->is_default,
            'is_expired' => $this->is_expired,
        ];
    }
}
