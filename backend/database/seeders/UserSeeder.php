<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@shanloray.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create Sample Users
        $users = [
            [
                'first_name' => 'Sarah',
                'last_name' => 'Johnson',
                'email' => 'sarah@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'first_name' => 'Michael',
                'last_name' => 'Chen',
                'email' => 'michael@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'first_name' => 'Emma',
                'last_name' => 'Wilson',
                'email' => 'emma@example.com',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($users as $userData) {
            User::create(array_merge($userData, [
                'email_verified_at' => now(),
            ]));
        }

        // Create 10 more random users
        User::factory(10)->create();
    }
}
