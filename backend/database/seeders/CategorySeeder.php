<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Skincare',
                'slug' => 'skincare',
                'description' => 'Premium skincare products for radiant, healthy skin',
                'image' => '/images/categories/skincare.jpg',
                'sort_order' => 1,
            ],
            [
                'name' => 'Makeup',
                'slug' => 'makeup',
                'description' => 'Luxurious makeup for a flawless look',
                'image' => '/images/categories/makeup.jpg',
                'sort_order' => 2,
            ],
            [
                'name' => 'Fragrance',
                'slug' => 'fragrance',
                'description' => 'Exquisite fragrances that captivate the senses',
                'image' => '/images/categories/fragrance.jpg',
                'sort_order' => 3,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
