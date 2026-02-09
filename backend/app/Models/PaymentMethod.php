<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'card_brand',
        'card_last_four',
        'card_exp_month',
        'card_exp_year',
        'billing_name',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    /**
     * Get the user that owns this payment method.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get masked card number for display.
     */
    public function getMaskedCardAttribute(): string
    {
        return "**** **** **** {$this->card_last_four}";
    }

    /**
     * Get expiry date for display.
     */
    public function getExpiryDateAttribute(): string
    {
        return "{$this->card_exp_month}/{$this->card_exp_year}";
    }

    /**
     * Check if card is expired.
     */
    public function getIsExpiredAttribute(): bool
    {
        $now = now();
        $expYear = (int) $this->card_exp_year;
        $expMonth = (int) $this->card_exp_month;

        if ($expYear < $now->year) {
            return true;
        }

        if ($expYear === $now->year && $expMonth < $now->month) {
            return true;
        }

        return false;
    }

    /**
     * Set this payment method as the default.
     */
    public function setAsDefault(): void
    {
        self::where('user_id', $this->user_id)
            ->where('id', '!=', $this->id)
            ->update(['is_default' => false]);

        $this->update(['is_default' => true]);
    }
}
