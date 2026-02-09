<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Specialist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'title',
        'specialty',
        'bio',
        'image',
        'rating',
        'reviews_count',
        'consultations_count',
        'expertise',
        'languages',
        'availability',
        'consultation_duration',
        'consultation_fee',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'consultation_fee' => 'decimal:2',
        'expertise' => 'array',
        'languages' => 'array',
        'availability' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    /**
     * Get consultations for this specialist.
     */
    public function consultations(): HasMany
    {
        return $this->hasMany(Consultation::class);
    }

    /**
     * Scope for active specialists.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for featured specialists.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope by specialty.
     */
    public function scopeSpecialty($query, string $specialty)
    {
        return $query->where('specialty', $specialty);
    }

    /**
     * Check if specialist is available on a given date/time.
     */
    public function isAvailableAt(string $date, string $time): bool
    {
        $dayOfWeek = strtolower(date('l', strtotime($date)));
        
        if (!$this->availability || !isset($this->availability[$dayOfWeek])) {
            return false;
        }

        $daySchedule = $this->availability[$dayOfWeek];
        
        if (!$daySchedule['available']) {
            return false;
        }

        // Check if time is within available hours
        $requestedTime = strtotime($time);
        $startTime = strtotime($daySchedule['start']);
        $endTime = strtotime($daySchedule['end']);

        if ($requestedTime < $startTime || $requestedTime >= $endTime) {
            return false;
        }

        // Check for existing booking
        return !$this->consultations()
            ->where('scheduled_date', $date)
            ->where('scheduled_time', $time)
            ->whereNotIn('status', ['cancelled', 'no_show'])
            ->exists();
    }

    /**
     * Get available time slots for a given date.
     */
    public function getAvailableSlotsForDate(string $date): array
    {
        $dayOfWeek = strtolower(date('l', strtotime($date)));
        
        if (!$this->availability || !isset($this->availability[$dayOfWeek])) {
            return [];
        }

        $daySchedule = $this->availability[$dayOfWeek];
        
        if (!$daySchedule['available']) {
            return [];
        }

        $slots = [];
        $current = strtotime($daySchedule['start']);
        $end = strtotime($daySchedule['end']);
        $duration = $this->consultation_duration * 60; // Convert to seconds

        // Get booked slots
        $bookedSlots = $this->consultations()
            ->where('scheduled_date', $date)
            ->whereNotIn('status', ['cancelled', 'no_show'])
            ->pluck('scheduled_time')
            ->map(fn($t) => date('H:i', strtotime($t)))
            ->toArray();

        while ($current + $duration <= $end) {
            $timeSlot = date('H:i', $current);
            if (!in_array($timeSlot, $bookedSlots)) {
                $slots[] = $timeSlot;
            }
            $current += $duration;
        }

        return $slots;
    }
}
