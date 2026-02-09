<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'status',
        'shipping_first_name',
        'shipping_last_name',
        'shipping_phone',
        'shipping_address_line_1',
        'shipping_address_line_2',
        'shipping_city',
        'shipping_state',
        'shipping_postal_code',
        'shipping_country',
        'billing_first_name',
        'billing_last_name',
        'billing_address_line_1',
        'billing_city',
        'billing_postal_code',
        'billing_country',
        'subtotal',
        'shipping_cost',
        'tax',
        'discount',
        'total',
        'payment_method',
        'payment_status',
        'payment_transaction_id',
        'shipping_method',
        'tracking_number',
        'shipped_at',
        'delivered_at',
        'customer_notes',
        'admin_notes',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    /**
     * Generate unique order number.
     */
    public static function generateOrderNumber(): string
    {
        $prefix = 'SL';
        $timestamp = now()->format('ymd');
        $random = strtoupper(substr(uniqid(), -4));
        return "{$prefix}{$timestamp}{$random}";
    }

    /**
     * Get the user that placed this order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items in this order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the status history for this order.
     */
    public function statusHistory(): HasMany
    {
        return $this->hasMany(OrderStatus::class)->orderBy('occurred_at', 'desc');
    }

    /**
     * Get items count.
     */
    public function getItemsCountAttribute(): int
    {
        return $this->items->sum('quantity');
    }

    /**
     * Get shipping full name.
     */
    public function getShippingFullNameAttribute(): string
    {
        return "{$this->shipping_first_name} {$this->shipping_last_name}";
    }

    /**
     * Get formatted shipping address.
     */
    public function getFormattedShippingAddressAttribute(): string
    {
        $parts = array_filter([
            $this->shipping_address_line_1,
            $this->shipping_address_line_2,
            $this->shipping_city,
            $this->shipping_state,
            $this->shipping_postal_code,
            $this->shipping_country,
        ]);
        return implode(', ', $parts);
    }

    /**
     * Check if order can be cancelled.
     */
    public function getCanCancelAttribute(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']);
    }

    /**
     * Check if order is completed.
     */
    public function getIsCompletedAttribute(): bool
    {
        return in_array($this->status, ['delivered', 'cancelled', 'refunded']);
    }

    /**
     * Add a status update to the order.
     */
    public function addStatusUpdate(string $status, string $title, ?string $description = null, ?string $location = null): OrderStatus
    {
        $this->update(['status' => $status]);

        return $this->statusHistory()->create([
            'status' => $status,
            'title' => $title,
            'description' => $description,
            'location' => $location,
            'occurred_at' => now(),
        ]);
    }

    /**
     * Cancel the order.
     */
    public function cancel(?string $reason = null): bool
    {
        if (!$this->can_cancel) {
            return false;
        }

        $this->addStatusUpdate(
            'cancelled',
            'Order Cancelled',
            $reason ?? 'Order was cancelled by customer'
        );

        return true;
    }

    /**
     * Scope for user's orders.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope for status.
     */
    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }
}
