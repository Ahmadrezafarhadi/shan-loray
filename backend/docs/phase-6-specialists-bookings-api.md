# Phase 6: Specialists & Bookings API Documentation

## Overview
Beauty specialists and consultation booking system.

**Base URL:** `http://127.0.0.1:8000/api/v1`

---

## Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/specialists` | List specialists |
| GET | `/specialists/featured` | Featured specialists |
| GET | `/specialists/{slug}` | Specialist details |
| GET | `/specialists/{slug}/availability` | Get available slots |

### Get Availability

```
GET /specialists/dr-amara-hassan/availability?date=2026-02-07
```

**Response:**
```json
{
  "specialist_id": "1",
  "date": "2026-02-07",
  "available_slots": ["09:00", "09:30", "10:00", "10:30", "11:00"],
  "duration": 30
}
```

---

## Protected Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/consultations` | List bookings |
| POST | `/consultations` | Book consultation |
| GET | `/consultations/{id}` | Get booking |
| POST | `/consultations/{id}/cancel` | Cancel |
| POST | `/consultations/{id}/reschedule` | Reschedule |
| POST | `/consultations/{id}/rate` | Rate & review |

### Book Consultation

```json
POST /consultations
{
  "specialist_id": 1,
  "type": "video",
  "scheduled_date": "2026-02-07",
  "scheduled_time": "10:00",
  "concern_area": "Anti-aging",
  "customer_notes": "Concerned about fine lines"
}
```

### Reschedule

```json
POST /consultations/{id}/reschedule
{
  "scheduled_date": "2026-02-08",
  "scheduled_time": "11:00"
}
```

### Rate Consultation

```json
POST /consultations/{id}/rate
{
  "rating": 5,
  "review": "Excellent advice!"
}
```

---

## Consultation Types
- `video` - Video call
- `in_person` - In-store
- `chat` - Text chat

## Consultation Statuses
| Status | Description |
|--------|-------------|
| `pending` | Awaiting confirmation |
| `confirmed` | Confirmed |
| `in_progress` | In session |
| `completed` | Finished |
| `cancelled` | Cancelled |
| `no_show` | Customer didn't show |

---

## Specialists (3 seeded)
1. **Dr. Amara Hassan** - Skincare (30 min, free)
2. **Maya Patel** - Makeup (45 min, free)
3. **Jean-Pierre Leclerc** - Fragrance (30 min, free)
