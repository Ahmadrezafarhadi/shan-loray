<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'status',
        'title',
        'description',
        'location',
        'occurred_at',
    ];

    protected $casts = [
        'occurred_at' => 'datetime',
    ];

    /**
     * Get the order this status belongs to.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get status icon based on status type.
     */
    public function getIconAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'clock',
            'confirmed' => 'check-circle',
            'processing' => 'package',
            'shipped' => 'truck',
            'delivered' => 'home',
            'cancelled' => 'x-circle',
            'refunded' => 'refresh-cw',
            default => 'circle',
        };
    }
}
