<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skincare = Category::where('slug', 'skincare')->first();
        $makeup = Category::where('slug', 'makeup')->first();
        $fragrance = Category::where('slug', 'fragrance')->first();

        // Skincare Products
        $skincareProducts = [
            [
                'name' => 'Advanced Retinol Night Serum',
                'description' => 'Time-release formula for smooth, youthful skin',
                'price' => 198.00,
                'image' => '/images/products/skincare/retinol-night-serum.jpg',
                'rating' => 5,
                'reviews_count' => 534,
                'concerns' => ['antiAging'],
            ],
            [
                'name' => 'Hydrating Gel Cleanser',
                'description' => 'Gentle daily cleanser for all skin types',
                'price' => 58.00,
                'image' => '/images/products/skincare/hydrating-gel-cleanser.jpg',
                'rating' => 5,
                'reviews_count' => 534,
                'skin_types' => ['normal', 'dry', 'oily', 'combination', 'sensitive'],
            ],
            [
                'name' => 'Peptide Eye Renewal Cream',
                'description' => 'Targets fine lines and dark circles',
                'price' => 145.00,
                'image' => '/images/products/skincare/peptide-eye-cream.jpg',
                'rating' => 5,
                'reviews_count' => 412,
                'concerns' => ['antiAging', 'darkSpots'],
            ],
            [
                'name' => 'Deep Moisture Face Cream',
                'description' => '24-hour hydration therapy',
                'price' => 128.00,
                'image' => '/images/products/skincare/deep-moisture-cream.jpg',
                'rating' => 5,
                'reviews_count' => 621,
                'concerns' => ['hydration'],
            ],
            [
                'name' => 'Illuminating Clay Mask',
                'description' => 'Purifies and brightens complexion',
                'price' => 78.00,
                'image' => '/images/products/skincare/illuminating-clay-mask.jpg',
                'rating' => 5,
                'reviews_count' => 445,
                'concerns' => ['brightening', 'pores'],
            ],
            [
                'name' => 'Mineral Defense SPF 50',
                'description' => 'Broad spectrum sun protection',
                'price' => 72.00,
                'image' => '/images/products/skincare/mineral-spf50.jpg',
                'rating' => 5,
                'reviews_count' => 789,
            ],
            [
                'name' => 'Complete Skincare Ritual Set',
                'description' => 'Four essential steps to luminous skin',
                'price' => 380.00,
                'image' => '/images/products/skincare/skincare-ritual-set.jpg',
                'rating' => 5,
                'reviews_count' => 156,
                'is_featured' => true,
            ],
            [
                'name' => 'Travel Essentials Collection',
                'description' => 'Your complete routine in travel sizes',
                'price' => 245.00,
                'image' => '/images/products/skincare/travel-essentials.jpg',
                'rating' => 5,
                'reviews_count' => 203,
            ],
        ];

        foreach ($skincareProducts as $product) {
            Product::create(array_merge($product, [
                'category_id' => $skincare->id,
                'slug' => Str::slug($product['name']),
                'brand' => 'Shan Loray',
            ]));
        }

        // Makeup Products
        $makeupProducts = [
            [
                'name' => 'Velvet Matte Lipstick',
                'description' => 'Long-lasting color with moisturizing formula',
                'price' => 42.00,
                'image' => '/images/products/makeup/velvet-matte-lipstick.jpg',
                'rating' => 5,
                'reviews_count' => 892,
                'badge' => 'bestseller',
                'finish' => 'matte',
            ],
            [
                'name' => 'Luminous Foundation',
                'description' => 'Buildable coverage with natural finish',
                'price' => 58.00,
                'image' => '/images/products/makeup/luminous-foundation.jpg',
                'rating' => 4,
                'reviews_count' => 445,
                'finish' => 'satin',
                'coverage' => 'medium',
            ],
            [
                'name' => 'Silk Blush Palette',
                'description' => 'Four harmonious shades for a natural flush',
                'price' => 52.00,
                'image' => '/images/products/makeup/silk-blush-palette.jpg',
                'rating' => 5,
                'reviews_count' => 678,
                'badge' => 'new',
                'finish' => 'satin',
            ],
            [
                'name' => 'Precision Eyeliner',
                'description' => 'Ultra-fine tip for flawless lines',
                'price' => 28.00,
                'image' => '/images/products/makeup/precision-eyeliner.jpg',
                'rating' => 5,
                'reviews_count' => 1245,
            ],
            [
                'name' => 'Volume Mascara',
                'description' => 'Dramatic lashes without clumping',
                'price' => 34.00,
                'image' => '/images/products/makeup/volume-mascara.jpg',
                'rating' => 5,
                'reviews_count' => 2103,
                'badge' => 'bestseller',
            ],
            [
                'name' => 'Contour & Highlight Duo',
                'description' => 'Sculpt and illuminate with ease',
                'price' => 48.00,
                'image' => '/images/products/makeup/silk-blush-palette.jpg',
                'rating' => 5,
                'reviews_count' => 534,
                'finish' => 'shimmer',
            ],
            [
                'name' => 'Complete Makeup Artist Set',
                'description' => 'Everything you need for a flawless look',
                'price' => 450.00,
                'image' => '/images/products/makeup/complete-makeup-artist-set.png',
                'rating' => 5,
                'reviews_count' => 324,
                'is_featured' => true,
            ],
            [
                'name' => 'Travel Glam Collection',
                'description' => 'Your beauty essentials in travel sizes',
                'price' => 185.00,
                'image' => '/images/products/makeup/travel-glam-collection.png',
                'rating' => 5,
                'reviews_count' => 567,
            ],
        ];

        foreach ($makeupProducts as $product) {
            Product::create(array_merge($product, [
                'category_id' => $makeup->id,
                'slug' => Str::slug($product['name']),
                'brand' => 'Shan Loray',
            ]));
        }

        // Fragrance Products
        $fragranceProducts = [
            [
                'name' => 'Signature Oud Collection',
                'description' => 'Luxurious blend of rare oud and precious florals',
                'price' => 385.00,
                'image' => '/images/products/fragrance/signature-oud.jpg',
                'rating' => 5,
                'reviews_count' => 412,
                'badge' => 'signature',
                'fragrance_type' => 'EDP',
                'scent_family' => 'Oriental',
                'fragrance_notes' => 'Oud, Rose, Amber',
                'available_sizes' => ['30ml', '50ml', '100ml'],
                'is_featured' => true,
            ],
            [
                'name' => 'Rose Noir Eau de Parfum',
                'description' => 'Deep rose with hints of amber and patchouli',
                'price' => 245.00,
                'image' => '/images/products/fragrance/rose-noir.jpg',
                'rating' => 5,
                'reviews_count' => 534,
                'fragrance_type' => 'EDP',
                'scent_family' => 'Floral',
                'fragrance_notes' => 'Rose, Amber, Patchouli',
                'available_sizes' => ['30ml', '50ml', '100ml'],
            ],
            [
                'name' => 'Citrus Garden Eau de Toilette',
                'description' => 'Fresh bergamot, neroli, and white musk',
                'price' => 165.00,
                'image' => '/images/products/fragrance/citrus-garden.jpg',
                'rating' => 5,
                'reviews_count' => 298,
                'fragrance_type' => 'EDT',
                'scent_family' => 'Citrus',
                'fragrance_notes' => 'Bergamot, Neroli, White Musk',
                'available_sizes' => ['30ml', '50ml', '100ml'],
            ],
            [
                'name' => 'Velvet Jasmine',
                'description' => 'Floral Oriental',
                'price' => 195.00,
                'image' => '/images/products/fragrance/velvet-jasmine.jpg',
                'rating' => 5,
                'reviews_count' => 621,
                'fragrance_type' => 'EDP',
                'scent_family' => 'Floral Oriental',
                'fragrance_notes' => 'Jasmine, Sandalwood, Vanilla',
            ],
            [
                'name' => 'Amber Woods',
                'description' => 'Woody Spicy',
                'price' => 225.00,
                'image' => '/images/products/fragrance/amber-woods.jpg',
                'rating' => 5,
                'reviews_count' => 445,
                'fragrance_type' => 'EDP',
                'scent_family' => 'Woody Spicy',
                'fragrance_notes' => 'Amber, Cedar, Spices',
            ],
            [
                'name' => 'White Lotus',
                'description' => 'Fresh Floral',
                'price' => 185.00,
                'image' => '/images/products/fragrance/white-lotus.jpg',
                'rating' => 5,
                'reviews_count' => 789,
                'fragrance_type' => 'EDT',
                'scent_family' => 'Fresh Floral',
                'fragrance_notes' => 'Lotus, Green Tea, Musk',
            ],
            [
                'name' => 'Prestige Discovery Collection',
                'description' => 'Experience our six most iconic fragrances in luxurious travel sizes',
                'price' => 295.00,
                'image' => '/images/products/fragrance/prestige-discovery.jpg',
                'rating' => 5,
                'reviews_count' => 203,
                'badge' => 'limited',
                'fragrance_type' => 'EDP',
                'scent_family' => 'Discovery Set',
            ],
            [
                'name' => 'Dual Essence Set',
                'description' => 'Day and night fragrances paired perfectly',
                'price' => 385.00,
                'image' => '/images/products/fragrance/dual-essence-set.jpg',
                'rating' => 5,
                'reviews_count' => 167,
                'fragrance_type' => 'EDP',
                'scent_family' => 'Gift Set',
            ],
        ];

        foreach ($fragranceProducts as $product) {
            Product::create(array_merge($product, [
                'category_id' => $fragrance->id,
                'slug' => Str::slug($product['name']),
                'brand' => 'Shan Loray',
            ]));
        }
    }
}
