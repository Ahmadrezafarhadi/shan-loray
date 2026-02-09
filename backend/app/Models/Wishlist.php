<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
    ];

    /**
     * Get the user that owns this wishlist item.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product in this wishlist item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Toggle product in user's wishlist.
     * Returns true if added, false if removed.
     */
    public static function toggle(int $userId, int $productId): bool
    {
        $existing = self::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($existing) {
            $existing->delete();
            return false;
        }

        self::create([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);

        return true;
    }

    /**
     * Check if product is in user's wishlist.
     */
    public static function isInWishlist(int $userId, int $productId): bool
    {
        return self::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();
    }
}
