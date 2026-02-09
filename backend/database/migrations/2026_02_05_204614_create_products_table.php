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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('brand')->default('Shan Loray');
            $table->string('image'); // Primary image
            $table->unsignedTinyInteger('rating')->default(5); // 1-5
            $table->unsignedInteger('reviews_count')->default(0);
            $table->string('badge')->nullable(); // bestseller, new, limited, signature
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->integer('stock_quantity')->default(100);
            $table->integer('sort_order')->default(0);

            // Fragrance-specific fields (nullable for non-fragrance products)
            $table->string('fragrance_type')->nullable(); // EDP, EDT
            $table->string('scent_family')->nullable(); // Oriental, Floral, Citrus, etc.
            $table->string('fragrance_notes')->nullable(); // "Oud, Rose, Amber"
            $table->json('available_sizes')->nullable(); // ["30ml", "50ml", "100ml"]

            // Makeup-specific fields
            $table->string('finish')->nullable(); // matte, satin, shimmer
            $table->string('coverage')->nullable(); // sheer, medium, full

            // Skincare-specific fields
            $table->json('skin_types')->nullable(); // ["normal", "dry", "oily"]
            $table->json('concerns')->nullable(); // ["antiAging", "hydration"]

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
