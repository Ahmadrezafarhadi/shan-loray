<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    title: "Shan Loray Beauty E-Commerce API",
    description: "Complete REST API for the Shan Loray luxury beauty e-commerce platform",
    contact: new OA\Contact(email: "api@shanloray.com", name: "Shan Loray API Support"),
    license: new OA\License(name: "Proprietary", url: "https://shanloray.com/terms")
)]
#[OA\Server(url: "/api/v1", description: "API v1 Server")]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Enter your Sanctum token"
)]
#[OA\Tag(name: "Authentication", description: "User registration, login, and logout")]
#[OA\Tag(name: "Profile", description: "User profile management")]
#[OA\Tag(name: "Addresses", description: "Shipping and billing addresses")]
#[OA\Tag(name: "Payment Methods", description: "Saved payment methods")]
#[OA\Tag(name: "Categories", description: "Product categories")]
#[OA\Tag(name: "Products", description: "Product catalog and search")]
#[OA\Tag(name: "Collections", description: "Curated product collections")]
#[OA\Tag(name: "Cart", description: "Shopping cart management")]
#[OA\Tag(name: "Wishlist", description: "Product wishlist")]
#[OA\Tag(name: "Orders", description: "Order placement and tracking")]
#[OA\Tag(name: "Specialists", description: "Beauty specialists")]
#[OA\Tag(name: "Consultations", description: "Consultation bookings")]
class ApiController extends Controller
{
    //
}
