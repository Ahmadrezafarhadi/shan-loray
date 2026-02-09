<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_slug',
        'product_image',
        'product_brand',
        'size',
        'quantity',
        'unit_price',
        'total',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    /**
     * Get the order this item belongs to.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product (may be null if product was deleted).
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Create from cart item.
     */
    public static function createFromCartItem(CartItem $cartItem): array
    {
        $product = $cartItem->product;

        return [
            'product_id' => $product->id,
            'product_name' => $product->name,
            'product_slug' => $product->slug,
            'product_image' => $product->image,
            'product_brand' => $product->brand,
            'size' => $cartItem->size,
            'quantity' => $cartItem->quantity,
            'unit_price' => $cartItem->unit_price,
            'total' => $cartItem->total,
        ];
    }
}
