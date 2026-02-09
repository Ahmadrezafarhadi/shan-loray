# Phase 2: Product Catalog API Documentation

## Overview
Complete product catalog API for the Shan Loray e-commerce platform.

**Base URL:** `http://127.0.0.1:8000/api/v1`

---

## Categories

### Get All Categories
```
GET /categories
```

**Response (200):**
```json
{
  "categories": [
    {
      "id": "1",
      "name": "Skincare",
      "slug": "skincare",
      "description": "Premium skincare products for radiant, healthy skin",
      "image": "/images/categories/skincare.jpg",
      "products_count": 8
    }
  ]
}
```

### Get Single Category
```
GET /categories/{slug}
```

---

## Products

### List Products (with filtering)
```
GET /products
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category slug (skincare, makeup, fragrance) |
| `min_price` | number | Minimum price filter |
| `max_price` | number | Maximum price filter |
| `sort` | string | Sort by: `bestselling`, `newest`, `price_low`, `price_high`, `rating` |
| `badge` | string | Filter by badge: `bestseller`, `new`, `limited`, `signature` |
| `featured` | boolean | Get only featured products |
| `search` | string | Search in name/description |
| `per_page` | number | Items per page (default: 12, max: 50) |
| `page` | number | Page number |
| `skin_types` | string | Skincare: `normal,dry,oily,combination,sensitive` |
| `concerns` | string | Skincare: `antiAging,hydration,brightening,acne` |
| `finish` | string | Makeup: `matte,satin,shimmer,glitter` |
| `coverage` | string | Makeup: `sheer,medium,full` |
| `scent_family` | string | Fragrance: `Oriental,Floral,Citrus,Woody` |
| `fragrance_type` | string | Fragrance: `EDP,EDT` |

**Example Request:**
```
GET /products?category=skincare&sort=price_low&min_price=50&max_price=200
```

**Response (200):**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Advanced Retinol Night Serum",
      "slug": "advanced-retinol-night-serum",
      "description": "Time-release formula for smooth, youthful skin",
      "price": 198.00,
      "sale_price": null,
      "brand": "Shan Loray",
      "image": "/images/products/skincare/retinol-night-serum.jpg",
      "rating": 5,
      "reviews": 534,
      "badge": null,
      "category": "skincare",
      "is_featured": false,
      "in_stock": true,
      "concerns": ["antiAging"]
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 2,
    "per_page": 12,
    "total": 24
  }
}
```

### Get Featured Products
```
GET /products/featured
```

### Get Bestsellers
```
GET /products/bestsellers
```

### Get New Arrivals
```
GET /products/new-arrivals
```

### Search Products
```
GET /products/search?q=serum
```

### Get Single Product
```
GET /products/{slug}
```

**Fragrance Product Example Response:**
```json
{
  "product": {
    "id": "17",
    "name": "Signature Oud Collection",
    "slug": "signature-oud-collection",
    "description": "Luxurious blend of rare oud and precious florals",
    "price": 385.00,
    "image": "/images/products/fragrance/signature-oud.jpg",
    "rating": 5,
    "reviews": 412,
    "badge": "signature",
    "category": "fragrance",
    "fragrance_type": "EDP",
    "scent_family": "Oriental",
    "notes": "Oud, Rose, Amber",
    "sizes": ["30ml", "50ml", "100ml"]
  }
}
```

---

## Collections

### Get All Collections
```
GET /collections
```

### Get Featured Collections
```
GET /collections/featured
```

### Get Single Collection (with products)
```
GET /collections/{slug}
```

---

## Frontend Integration

### Using with React
```typescript
// Fetch products with filters
const fetchProducts = async (filters: ProductFilters) => {
  const params = new URLSearchParams({
    category: filters.category,
    sort: filters.sortBy,
    min_price: String(filters.priceRange.min),
    max_price: String(filters.priceRange.max),
    per_page: '12',
    page: String(filters.page),
  });

  const response = await fetch(`${API_URL}/products?${params}`);
  return response.json();
};

// Fetch single product
const fetchProduct = async (slug: string) => {
  const response = await fetch(`${API_URL}/products/${slug}`);
  return response.json();
};
```

---

## Testing with cURL

### Get all products:
```bash
curl http://127.0.0.1:8000/api/v1/products
```

### Filter skincare products:
```bash
curl "http://127.0.0.1:8000/api/v1/products?category=skincare&sort=price_low"
```

### Get bestsellers:
```bash
curl http://127.0.0.1:8000/api/v1/products/bestsellers
```

### Search:
```bash
curl "http://127.0.0.1:8000/api/v1/products/search?q=serum"
```

---

## Database Summary

| Table | Records |
|-------|---------|
| categories | 3 (Skincare, Makeup, Fragrance) |
| products | 24 (8 per category) |
| collections | 4 (Bestsellers, New Arrivals, Gift Sets, Travel) |
