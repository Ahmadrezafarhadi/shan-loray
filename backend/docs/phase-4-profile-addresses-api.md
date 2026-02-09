# Phase 4: User Profile & Addresses API Documentation

## Overview
User profile management, addresses, and payment methods APIs.

**Base URL:** `http://127.0.0.1:8000/api/v1`  
**Authentication:** All endpoints require `Authorization: Bearer {token}`

---

## Profile Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/profile` | Update profile |
| PUT | `/profile/password` | Change password |
| DELETE | `/profile` | Delete account |

### Update Profile
```json
PUT /profile
{
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "+971501234567"
}
```

### Change Password
```json
PUT /profile/password
{
  "current_password": "oldPassword123",
  "password": "newPassword123",
  "password_confirmation": "newPassword123"
}
```

---

## Address Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/addresses` | List all addresses |
| POST | `/addresses` | Create address |
| GET | `/addresses/{id}` | Get address |
| PUT | `/addresses/{id}` | Update address |
| DELETE | `/addresses/{id}` | Delete address |
| POST | `/addresses/{id}/default` | Set as default |

### Create Address
```json
POST /addresses
{
  "label": "Home",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "+971501234567",
  "address_line_1": "123 Palm Jumeirah",
  "address_line_2": "Apt 5B",
  "city": "Dubai",
  "state": "Dubai",
  "postal_code": "12345",
  "country": "AE",
  "is_default": true
}
```

---

## Payment Method Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/payment-methods` | List payment methods |
| POST | `/payment-methods` | Add payment method |
| GET | `/payment-methods/{id}` | Get payment method |
| PUT | `/payment-methods/{id}` | Update payment method |
| DELETE | `/payment-methods/{id}` | Delete payment method |
| POST | `/payment-methods/{id}/default` | Set as default |

### Add Payment Method
```json
POST /payment-methods
{
  "type": "card",
  "card_brand": "visa",
  "card_last_four": "4242",
  "card_exp_month": "12",
  "card_exp_year": "2028",
  "billing_name": "Jane Doe",
  "is_default": true
}
```

---

## Testing with cURL

```bash
# Get profile
curl http://127.0.0.1:8002/api/v1/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create address
curl -X POST http://127.0.0.1:8002/api/v1/addresses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"first_name":"Jane","last_name":"Doe","address_line_1":"123 Street","city":"Dubai","postal_code":"12345"}'
```
