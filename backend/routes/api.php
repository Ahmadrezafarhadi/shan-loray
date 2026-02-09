<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PaymentMethodController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SpecialistController;
use App\Http\Controllers\Api\WishlistController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Shan Loray Beauty E-Commerce API
| Version: 1.0
|
*/

// API Version 1
Route::prefix('v1')->group(function () {

    // ============================
    // Authentication Routes
    // ============================
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // ============================
    // Public Catalog Routes
    // ============================

    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);

    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/bestsellers', [ProductController::class, 'bestsellers']);
    Route::get('/products/new-arrivals', [ProductController::class, 'newArrivals']);
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);

    // Collections
    Route::get('/collections', [CollectionController::class, 'index']);
    Route::get('/collections/featured', [CollectionController::class, 'featured']);
    Route::get('/collections/{slug}', [CollectionController::class, 'show']);

    // Specialists (public)
    Route::get('/specialists', [SpecialistController::class, 'index'])->name('specialists.index');
    Route::get('/specialists/featured', [SpecialistController::class, 'featured']);
    Route::get('/specialists/{slug}', [SpecialistController::class, 'show'])->name('specialists.show');
    Route::get('/specialists/{slug}/availability', [SpecialistController::class, 'availability']);

    // ============================
    // Protected Routes
    // ============================
    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/user', [AuthController::class, 'user']);

        // Profile
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::put('/profile', [ProfileController::class, 'update']);
        Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
        Route::delete('/profile', [ProfileController::class, 'destroy']);

        // Addresses
        Route::get('/addresses', [AddressController::class, 'index']);
        Route::post('/addresses', [AddressController::class, 'store']);
        Route::get('/addresses/{address}', [AddressController::class, 'show']);
        Route::put('/addresses/{address}', [AddressController::class, 'update']);
        Route::delete('/addresses/{address}', [AddressController::class, 'destroy']);
        Route::post('/addresses/{address}/default', [AddressController::class, 'setDefault']);

        // Payment Methods
        Route::get('/payment-methods', [PaymentMethodController::class, 'index']);
        Route::post('/payment-methods', [PaymentMethodController::class, 'store']);
        Route::get('/payment-methods/{paymentMethod}', [PaymentMethodController::class, 'show']);
        Route::put('/payment-methods/{paymentMethod}', [PaymentMethodController::class, 'update']);
        Route::delete('/payment-methods/{paymentMethod}', [PaymentMethodController::class, 'destroy']);
        Route::post('/payment-methods/{paymentMethod}/default', [PaymentMethodController::class, 'setDefault']);

        // Cart
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{cartItem}', [CartController::class, 'update']);
        Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);
        Route::delete('/cart', [CartController::class, 'clear']);

        // Wishlist
        Route::get('/wishlist', [WishlistController::class, 'index']);
        Route::post('/wishlist', [WishlistController::class, 'store']);
        Route::post('/wishlist/toggle', [WishlistController::class, 'toggle']);
        Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy']);
        Route::get('/wishlist/check/{product}', [WishlistController::class, 'check']);
        Route::get('/wishlist/ids', [WishlistController::class, 'ids']);

        // Orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']); // Checkout
        Route::get('/orders/{order}', [OrderController::class, 'show']);
        Route::post('/orders/{order}/cancel', [OrderController::class, 'cancel']);
        Route::get('/orders/{order}/track', [OrderController::class, 'track']);

        // Consultations (Bookings)
        Route::get('/consultations', [ConsultationController::class, 'index']);
        Route::post('/consultations', [ConsultationController::class, 'store']); // Book
        Route::get('/consultations/{consultation}', [ConsultationController::class, 'show']);
        Route::post('/consultations/{consultation}/cancel', [ConsultationController::class, 'cancel']);
        Route::post('/consultations/{consultation}/reschedule', [ConsultationController::class, 'reschedule']);
        Route::post('/consultations/{consultation}/rate', [ConsultationController::class, 'rate']);

    });

});
