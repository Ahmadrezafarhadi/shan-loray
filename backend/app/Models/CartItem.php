<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'size',
        'unit_price',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
    ];

    /**
     * Get the cart that owns this item.
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Get the product for this item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the line total (unit_price * quantity).
     */
    public function getTotalAttribute(): float
    {
        return $this->unit_price * $this->quantity;
    }

    /**
     * Update quantity and ensure it's valid.
     */
    public function updateQuantity(int $quantity): bool
    {
        if ($quantity <= 0) {
            return $this->delete();
        }

        $this->quantity = min($quantity, 10); // Max 10 per item
        return $this->save();
    }
}
