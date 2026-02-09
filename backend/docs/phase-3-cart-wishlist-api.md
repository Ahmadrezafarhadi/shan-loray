# Phase 3: Cart & Wishlist API Documentation

## Overview
Cart and Wishlist APIs for authenticated users.

**Base URL:** `http://127.0.0.1:8000/api/v1`  
**Authentication:** All endpoints require `Authorization: Bearer {token}`

---

## Cart Endpoints

### Get Cart
```
GET /cart
```

**Response (200):**
```json
{
  "cart": {
    "id": "1",
    "items": [
      {
        "id": "1",
        "product": {
          "id": "1",
          "name": "Advanced Retinol Night Serum",
          "slug": "advanced-retinol-night-serum",
          "price": 198.00,
          "image": "/images/products/skincare/retinol-night-serum.jpg",
          "category": "skincare"
        },
        "quantity": 2,
        "size": null,
        "unit_price": 198.00,
        "total": 396.00
      }
    ],
    "items_count": 2,
    "subtotal": 396.00,
    "is_empty": false
  }
}
```

### Add to Cart
```
POST /cart
```

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2,
  "size": "50ml"  // optional, for fragrance
}
```

### Update Cart Item
```
PUT /cart/{cartItemId}
```

**Request Body:**
```json
{
  "quantity": 3
}
```

### Remove Cart Item
```
DELETE /cart/{cartItemId}
```

### Clear Cart
```
DELETE /cart
```

---

## Wishlist Endpoints

### Get Wishlist
```
GET /wishlist
```

**Response:**
```json
{
  "wishlist": [
    {
      "id": "1",
      "product": { ... },
      "added_at": "2026-02-06T00:00:00+00:00"
    }
  ],
  "count": 1
}
```

### Toggle Wishlist (Add/Remove)
```
POST /wishlist/toggle
```

**Request Body:**
```json
{
  "product_id": 1
}
```

**Response:**
```json
{
  "message": "Added to wishlist",
  "in_wishlist": true,
  "product": { ... }
}
```

### Add to Wishlist
```
POST /wishlist
```

### Remove from Wishlist
```
DELETE /wishlist/{productId}
```

### Check if in Wishlist
```
GET /wishlist/check/{productId}
```

### Get Wishlist Product IDs
```
GET /wishlist/ids
```

**Response:**
```json
{
  "product_ids": ["1", "5", "12"]
}
```

---

## Frontend Integration

### Cart Management
```typescript
// Add to cart
const addToCart = async (productId: number, quantity = 1, size?: string) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId, quantity, size }),
  });
  return response.json();
};

// Update quantity
const updateCartItem = async (cartItemId: number, quantity: number) => {
  const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  return response.json();
};
```

### Wishlist Toggle
```typescript
const toggleWishlist = async (productId: number) => {
  const response = await fetch(`${API_URL}/wishlist/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: productId }),
  });
  return response.json();
};
```

---

## Testing with cURL

### Add to cart:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"product_id":1,"quantity":2}'
```

### Toggle wishlist:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/wishlist/toggle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"product_id":1}'
```
