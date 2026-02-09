<?php

namespace Database\Seeders;

use App\Models\Specialist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SpecialistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specialists = [
            [
                'name' => 'Dr. Amara Hassan',
                'title' => 'Senior Skincare Specialist',
                'specialty' => 'Skincare',
                'bio' => 'With over 15 years of experience in dermatology and skincare, Dr. Hassan specializes in creating personalized skincare routines for all skin types. She holds certifications from leading beauty institutes in Dubai and Paris.',
                'image' => '/images/specialists/amara-hassan.jpg',
                'rating' => 4.95,
                'reviews_count' => 127,
                'consultations_count' => 342,
                'expertise' => ['Anti-aging', 'Acne Treatment', 'Sensitive Skin', 'Hydration'],
                'languages' => ['English', 'Arabic', 'French'],
                'availability' => [
                    'monday' => ['available' => true, 'start' => '09:00', 'end' => '17:00'],
                    'tuesday' => ['available' => true, 'start' => '09:00', 'end' => '17:00'],
                    'wednesday' => ['available' => true, 'start' => '09:00', 'end' => '17:00'],
                    'thursday' => ['available' => true, 'start' => '09:00', 'end' => '17:00'],
                    'friday' => ['available' => false, 'start' => null, 'end' => null],
                    'saturday' => ['available' => true, 'start' => '10:00', 'end' => '14:00'],
                    'sunday' => ['available' => false, 'start' => null, 'end' => null],
                ],
                'consultation_duration' => 30,
                'consultation_fee' => 0,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Maya Patel',
                'title' => 'Celebrity Makeup Artist',
                'specialty' => 'Makeup',
                'bio' => 'Maya has worked with A-list celebrities and fashion houses worldwide. Her expertise in bridal, editorial, and everyday makeup makes her one of the most sought-after consultants in the region.',
                'image' => '/images/specialists/maya-patel.jpg',
                'rating' => 4.88,
                'reviews_count' => 89,
                'consultations_count' => 215,
                'expertise' => ['Bridal Makeup', 'Editorial', 'Contouring', 'Color Matching'],
                'languages' => ['English', 'Hindi', 'Arabic'],
                'availability' => [
                    'monday' => ['available' => true, 'start' => '10:00', 'end' => '18:00'],
                    'tuesday' => ['available' => true, 'start' => '10:00', 'end' => '18:00'],
                    'wednesday' => ['available' => false, 'start' => null, 'end' => null],
                    'thursday' => ['available' => true, 'start' => '10:00', 'end' => '18:00'],
                    'friday' => ['available' => true, 'start' => '10:00', 'end' => '18:00'],
                    'saturday' => ['available' => true, 'start' => '11:00', 'end' => '16:00'],
                    'sunday' => ['available' => false, 'start' => null, 'end' => null],
                ],
                'consultation_duration' => 45,
                'consultation_fee' => 0,
                'is_featured' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Jean-Pierre Leclerc',
                'title' => 'Master Perfumer',
                'specialty' => 'Fragrance',
                'bio' => 'Trained in Grasse, France, Jean-Pierre brings decades of olfactory expertise to help you discover your signature scent. He has created fragrances for luxury houses and understands the art of perfumery like no other.',
                'image' => '/images/specialists/jean-pierre-leclerc.jpg',
                'rating' => 4.92,
                'reviews_count' => 156,
                'consultations_count' => 428,
                'expertise' => ['Signature Scents', 'Layering', 'Seasonal Fragrances', 'Oud Specialist'],
                'languages' => ['English', 'French', 'Arabic'],
                'availability' => [
                    'monday' => ['available' => true, 'start' => '11:00', 'end' => '19:00'],
                    'tuesday' => ['available' => true, 'start' => '11:00', 'end' => '19:00'],
                    'wednesday' => ['available' => true, 'start' => '11:00', 'end' => '19:00'],
                    'thursday' => ['available' => true, 'start' => '11:00', 'end' => '19:00'],
                    'friday' => ['available' => false, 'start' => null, 'end' => null],
                    'saturday' => ['available' => false, 'start' => null, 'end' => null],
                    'sunday' => ['available' => true, 'start' => '12:00', 'end' => '17:00'],
                ],
                'consultation_duration' => 30,
                'consultation_fee' => 0,
                'is_featured' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($specialists as $specialistData) {
            $specialistData['slug'] = Str::slug($specialistData['name']);
            Specialist::create($specialistData);
        }
    }
}
