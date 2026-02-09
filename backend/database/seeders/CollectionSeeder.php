<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create collections
        $collections = [
            [
                'name' => 'Bestsellers',
                'slug' => 'bestsellers',
                'description' => 'Our most loved products',
                'image' => '/images/collections/bestsellers.jpg',
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'New Arrivals',
                'slug' => 'new-arrivals',
                'description' => 'Fresh additions to our collection',
                'image' => '/images/collections/new-arrivals.jpg',
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Gift Sets',
                'slug' => 'gift-sets',
                'description' => 'Perfect gift ideas for every occasion',
                'image' => '/images/collections/gift-sets.jpg',
                'is_featured' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Travel Essentials',
                'slug' => 'travel-essentials',
                'description' => 'Your beauty routine on the go',
                'image' => '/images/collections/travel-essentials.jpg',
                'is_featured' => false,
                'sort_order' => 4,
            ],
        ];

        foreach ($collections as $collectionData) {
            Collection::create($collectionData);
        }

        // Assign products to collections
        $bestsellers = Collection::where('slug', 'bestsellers')->first();
        $bestsellersProducts = Product::where('badge', 'bestseller')
            ->orWhere('is_featured', true)
            ->get();
        $bestsellers->products()->attach($bestsellersProducts->pluck('id'));

        $newArrivals = Collection::where('slug', 'new-arrivals')->first();
        $newProducts = Product::where('badge', 'new')->get();
        $newArrivals->products()->attach($newProducts->pluck('id'));

        $giftSets = Collection::where('slug', 'gift-sets')->first();
        $setProducts = Product::where('name', 'like', '%Set%')
            ->orWhere('name', 'like', '%Collection%')
            ->get();
        $giftSets->products()->attach($setProducts->pluck('id'));

        $travelEssentials = Collection::where('slug', 'travel-essentials')->first();
        $travelProducts = Product::where('name', 'like', '%Travel%')->get();
        $travelEssentials->products()->attach($travelProducts->pluck('id'));
    }
}
