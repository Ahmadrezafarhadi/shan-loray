<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('specialist_id')->constrained()->onDelete('cascade');
            
            // Booking details
            $table->enum('type', ['video', 'in_person', 'chat'])->default('video');
            $table->enum('status', [
                'pending',
                'confirmed',
                'in_progress',
                'completed',
                'cancelled',
                'no_show'
            ])->default('pending');
            
            // Schedule
            $table->date('scheduled_date');
            $table->time('scheduled_time');
            $table->unsignedInteger('duration')->default(30); // minutes
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            
            // Customer info
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();
            
            // Consultation details
            $table->string('concern_area')->nullable(); // Skincare, Makeup, etc.
            $table->text('customer_notes')->nullable();
            $table->text('specialist_notes')->nullable();
            
            // Meeting
            $table->string('meeting_link')->nullable();
            $table->string('meeting_id')->nullable();
            
            // Pricing
            $table->decimal('fee', 10, 2)->default(0);
            $table->string('payment_status')->default('pending');
            
            // Rating
            $table->unsignedTinyInteger('rating')->nullable();
            $table->text('review')->nullable();
            
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['specialist_id', 'scheduled_date']);
            $table->index(['scheduled_date', 'scheduled_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
