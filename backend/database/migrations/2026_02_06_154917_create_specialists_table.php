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
        Schema::create('specialists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('title'); // e.g., "Senior Skincare Specialist"
            $table->string('specialty'); // e.g., "Skincare", "Makeup", "Fragrance"
            $table->text('bio');
            $table->string('image')->nullable();
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->unsignedInteger('consultations_count')->default(0);
            $table->json('expertise')->nullable(); // Array of expertise areas
            $table->json('languages')->nullable(); // Languages spoken
            $table->json('availability')->nullable(); // Weekly schedule
            $table->unsignedInteger('consultation_duration')->default(30); // minutes
            $table->decimal('consultation_fee', 10, 2)->default(0); // Free or paid
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'specialty']);
            $table->index(['is_featured', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialists');
    }
};
