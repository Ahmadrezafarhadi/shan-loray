# Phase 5: Orders & Checkout API Documentation

## Overview
Complete checkout flow and order management APIs.

**Base URL:** `http://127.0.0.1:8000/api/v1`  
**Authentication:** All endpoints require `Authorization: Bearer {token}`

---

## Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | List user's orders |
| POST | `/orders` | Place order (checkout) |
| GET | `/orders/{id}` | Get order details |
| POST | `/orders/{id}/cancel` | Cancel order |
| GET | `/orders/{id}/track` | Get tracking info |

---

## Checkout (Place Order)

```json
POST /orders
{
  "shipping_address_id": 1,
  "billing_address_id": null,
  "payment_method": "card",
  "shipping_method": "standard",
  "customer_notes": "Please leave at door"
}
```

**Response (201):**
```json
{
  "message": "Order placed successfully",
  "order": {
    "id": "1",
    "order_number": "SL260206AB12",
    "status": "pending",
    "shipping_name": "Jane Doe",
    "subtotal": 396.00,
    "shipping_cost": 0.00,
    "tax": 19.80,
    "total": 415.80,
    "items": [...],
    "items_count": 2
  }
}
```

### Shipping Methods
| Method | Cost | Note |
|--------|------|------|
| `standard` | 15 AED | Free over 200 AED |
| `express` | 25 AED | |
| `same_day` | 50 AED | |

### Payment Methods
- `card` - Credit/Debit Card
- `paypal` - PayPal
- `cod` - Cash on Delivery

---

## Order Statuses

| Status | Description |
|--------|-------------|
| `pending` | Order received |
| `confirmed` | Payment confirmed |
| `processing` | Being prepared |
| `shipped` | In transit |
| `delivered` | Completed |
| `cancelled` | Cancelled |
| `refunded` | Refunded |

---

## Order Tracking

```
GET /orders/{id}/track
```

**Response:**
```json
{
  "order_number": "SL260206AB12",
  "status": "shipped",
  "tracking_number": "DHL123456789",
  "timeline": [
    {
      "status": "shipped",
      "title": "Order Shipped",
      "description": "Package picked up by carrier",
      "location": "Dubai Warehouse",
      "icon": "truck",
      "occurred_at": "2026-02-06T10:00:00+00:00"
    }
  ]
}
```

---

## Cancel Order

```json
POST /orders/{id}/cancel
{
  "reason": "Changed my mind"
}
```

> **Note:** Only orders with status `pending` or `confirmed` can be cancelled.

---

## Testing with cURL

```bash
# Place order
curl -X POST http://127.0.0.1:8002/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"shipping_address_id":1,"payment_method":"card"}'

# Get orders
curl http://127.0.0.1:8002/api/v1/orders \
  -H "Authorization: Bearer YOUR_TOKEN"

# Track order
curl http://127.0.0.1:8002/api/v1/orders/1/track \
  -H "Authorization: Bearer YOUR_TOKEN"
```
