#!/bin/bash

# Shan Loray Backend Startup Script
# This script handles the initial setup of the Laravel backend.

echo "🚀 Starting Shan Loray Backend Setup..."

# 1. Navigate to backend directory if not already there
if [ -d "backend" ]; then
    cd backend
fi

# 2. Check for .env file
if [ ! -f ".env" ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
else
    echo "✅ .env file already exists."
fi

# 3. Install Composer dependencies
echo "📦 Installing Composer dependencies..."
composer install

# 4. Generate Application Key
echo "🔑 Generating application key..."
php artisan key:generate

# 5. Run Migrations and Seeders
echo "🗄️ Setting up the database (Running migrations and seeders)..."
# Using migrate:fresh --seed to ensure a clean state as requested for "fake data samples to the entire site"
php artisan migrate:fresh --seed

# 6. Final Steps
echo "✅ Backend setup complete!"
echo "💡 You can now start the server by running: php artisan serve"

# Optional: Start the server (commented out by default)
# php artisan serve
