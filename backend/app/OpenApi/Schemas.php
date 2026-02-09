<?php

namespace App\OpenApi;

use OpenApi\Attributes as OA;

#[OA\Schema(schema: "User", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "first_name", type: "string", example: "Jane"),
    new OA\Property(property: "last_name", type: "string", example: "Doe"),
    new OA\Property(property: "full_name", type: "string", example: "Jane Doe"),
    new OA\Property(property: "email", type: "string", example: "jane@example.com"),
    new OA\Property(property: "phone", type: "string", example: "+971501234567"),
    new OA\Property(property: "avatar", type: "string", nullable: true),
    new OA\Property(property: "created_at", type: "string", format: "date-time")
])]
#[OA\Schema(schema: "Product", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "name", type: "string", example: "Hydrating Face Serum"),
    new OA\Property(property: "slug", type: "string", example: "hydrating-face-serum"),
    new OA\Property(property: "description", type: "string"),
    new OA\Property(property: "price", type: "number", format: "float", example: 149.00),
    new OA\Property(property: "original_price", type: "number", format: "float", nullable: true),
    new OA\Property(property: "currency", type: "string", example: "AED"),
    new OA\Property(property: "image", type: "string"),
    new OA\Property(property: "rating", type: "number", format: "float", example: 4.8),
    new OA\Property(property: "reviews_count", type: "integer", example: 127),
    new OA\Property(property: "in_stock", type: "boolean", example: true)
])]
#[OA\Schema(schema: "Category", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "name", type: "string", example: "Skincare"),
    new OA\Property(property: "slug", type: "string", example: "skincare"),
    new OA\Property(property: "description", type: "string"),
    new OA\Property(property: "image", type: "string"),
    new OA\Property(property: "products_count", type: "integer", example: 24)
])]
#[OA\Schema(schema: "Cart", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "items_count", type: "integer", example: 3),
    new OA\Property(property: "subtotal", type: "number", format: "float", example: 447.00)
])]
#[OA\Schema(schema: "Order", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "order_number", type: "string", example: "SL260206AB12"),
    new OA\Property(property: "status", type: "string", example: "pending"),
    new OA\Property(property: "total", type: "number", format: "float", example: 415.80),
    new OA\Property(property: "items_count", type: "integer", example: 2),
    new OA\Property(property: "created_at", type: "string", format: "date-time")
])]
#[OA\Schema(schema: "Address", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "label", type: "string", example: "Home"),
    new OA\Property(property: "city", type: "string", example: "Dubai"),
    new OA\Property(property: "country", type: "string", example: "UAE"),
    new OA\Property(property: "is_default", type: "boolean", example: true)
])]
#[OA\Schema(schema: "Specialist", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "name", type: "string", example: "Dr. Amara Hassan"),
    new OA\Property(property: "specialty", type: "string", example: "Skincare"),
    new OA\Property(property: "rating", type: "number", format: "float", example: 4.95)
])]
#[OA\Schema(schema: "Consultation", properties: [
    new OA\Property(property: "id", type: "string", example: "1"),
    new OA\Property(property: "booking_reference", type: "string", example: "CON2602061234ABC"),
    new OA\Property(property: "status", type: "string", example: "pending"),
    new OA\Property(property: "scheduled_date", type: "string", format: "date"),
    new OA\Property(property: "scheduled_time", type: "string", example: "10:00")
])]
#[OA\Schema(schema: "Pagination", properties: [
    new OA\Property(property: "current_page", type: "integer", example: 1),
    new OA\Property(property: "last_page", type: "integer", example: 5),
    new OA\Property(property: "per_page", type: "integer", example: 12),
    new OA\Property(property: "total", type: "integer", example: 56)
])]
class Schemas
{
    // OpenAPI schema definitions
}
