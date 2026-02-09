<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
    ];

    /**
     * Get the user that owns this cart.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all items in this cart.
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get the total number of items in cart.
     */
    public function getItemsCountAttribute(): int
    {
        return $this->items->sum('quantity');
    }

    /**
     * Get the subtotal of all items.
     */
    public function getSubtotalAttribute(): float
    {
        return $this->items->sum(function ($item) {
            return $item->unit_price * $item->quantity;
        });
    }

    /**
     * Check if cart is empty.
     */
    public function getIsEmptyAttribute(): bool
    {
        return $this->items->isEmpty();
    }

    /**
     * Clear all items from cart.
     */
    public function clear(): void
    {
        $this->items()->delete();
    }

    /**
     * Get or create cart for user.
     */
    public static function getOrCreateForUser(User $user): self
    {
        return self::firstOrCreate(['user_id' => $user->id]);
    }

    /**
     * Get or create cart for session (guest).
     */
    public static function getOrCreateForSession(string $sessionId): self
    {
        return self::firstOrCreate(['session_id' => $sessionId]);
    }

    /**
     * Merge guest cart into user cart.
     */
    public function mergeWith(Cart $guestCart): void
    {
        foreach ($guestCart->items as $guestItem) {
            $existingItem = $this->items()
                ->where('product_id', $guestItem->product_id)
                ->where('size', $guestItem->size)
                ->first();

            if ($existingItem) {
                $existingItem->increment('quantity', $guestItem->quantity);
            } else {
                $this->items()->create([
                    'product_id' => $guestItem->product_id,
                    'quantity' => $guestItem->quantity,
                    'size' => $guestItem->size,
                    'unit_price' => $guestItem->unit_price,
                ]);
            }
        }

        $guestCart->delete();
    }
}
