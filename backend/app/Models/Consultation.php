<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_reference',
        'user_id',
        'specialist_id',
        'type',
        'status',
        'scheduled_date',
        'scheduled_time',
        'duration',
        'started_at',
        'ended_at',
        'customer_name',
        'customer_email',
        'customer_phone',
        'concern_area',
        'customer_notes',
        'specialist_notes',
        'meeting_link',
        'meeting_id',
        'fee',
        'payment_status',
        'rating',
        'review',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'fee' => 'decimal:2',
        'rating' => 'integer',
    ];

    /**
     * Generate unique booking reference.
     */
    public static function generateBookingReference(): string
    {
        $prefix = 'CON';
        $timestamp = now()->format('ymdHi');
        $random = strtoupper(substr(uniqid(), -3));
        return "{$prefix}{$timestamp}{$random}";
    }

    /**
     * Get the user who booked this consultation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the specialist for this consultation.
     */
    public function specialist(): BelongsTo
    {
        return $this->belongsTo(Specialist::class);
    }

    /**
     * Get formatted date/time.
     */
    public function getScheduledDateTimeAttribute(): string
    {
        return $this->scheduled_date->format('Y-m-d') . ' ' . $this->scheduled_time;
    }

    /**
     * Check if consultation can be cancelled.
     */
    public function getCanCancelAttribute(): bool
    {
        if (!in_array($this->status, ['pending', 'confirmed'])) {
            return false;
        }

        // Can cancel up to 2 hours before
        $scheduledDateTime = strtotime($this->scheduled_date_time);
        return time() < ($scheduledDateTime - 7200);
    }

    /**
     * Check if consultation can be rescheduled.
     */
    public function getCanRescheduleAttribute(): bool
    {
        return $this->can_cancel;
    }

    /**
     * Check if consultation is upcoming.
     */
    public function getIsUpcomingAttribute(): bool
    {
        return in_array($this->status, ['pending', 'confirmed']) 
            && strtotime($this->scheduled_date_time) > time();
    }

    /**
     * Check if consultation can be rated.
     */
    public function getCanRateAttribute(): bool
    {
        return $this->status === 'completed' && is_null($this->rating);
    }

    /**
     * Confirm the consultation.
     */
    public function confirm(): bool
    {
        if ($this->status !== 'pending') {
            return false;
        }

        $this->update(['status' => 'confirmed']);
        return true;
    }

    /**
     * Cancel the consultation.
     */
    public function cancel(): bool
    {
        if (!$this->can_cancel) {
            return false;
        }

        $this->update(['status' => 'cancelled']);
        return true;
    }

    /**
     * Complete the consultation.
     */
    public function complete(): void
    {
        $this->update([
            'status' => 'completed',
            'ended_at' => now(),
        ]);

        // Update specialist's consultations count
        $this->specialist->increment('consultations_count');
    }

    /**
     * Add rating and review.
     */
    public function rate(int $rating, ?string $review = null): bool
    {
        if (!$this->can_rate || $rating < 1 || $rating > 5) {
            return false;
        }

        $this->update([
            'rating' => $rating,
            'review' => $review,
        ]);

        // Update specialist's rating
        $specialist = $this->specialist;
        $newCount = $specialist->reviews_count + 1;
        $newRating = (($specialist->rating * $specialist->reviews_count) + $rating) / $newCount;
        
        $specialist->update([
            'rating' => round($newRating, 2),
            'reviews_count' => $newCount,
        ]);

        return true;
    }

    /**
     * Scope for user's consultations.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope for upcoming consultations.
     */
    public function scopeUpcoming($query)
    {
        return $query->whereIn('status', ['pending', 'confirmed'])
            ->where('scheduled_date', '>=', now()->toDateString())
            ->orderBy('scheduled_date')
            ->orderBy('scheduled_time');
    }
}
