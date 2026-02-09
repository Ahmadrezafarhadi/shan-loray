# Phase 1: Authentication API Documentation

## Overview
This document describes the authentication APIs for the Shan Loray backend.

**Base URL:** `http://127.0.0.1:8000/api/v1`

---

## Endpoints

### 1. Register User
Creates a new user account and returns an authentication token.

```
POST /auth/register
```

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "first_name": "Elena",
  "last_name": "Petrova",
  "email": "elena@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "+1234567890"  // optional
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "1",
    "first_name": "Elena",
    "last_name": "Petrova",
    "email": "elena@example.com",
    "phone": "+1234567890",
    "avatar": null,
    "email_verified_at": null,
    "created_at": "2026-02-05T15:00:00+00:00",
    "updated_at": "2026-02-05T15:00:00+00:00"
  },
  "token": "1|abcdefghijklmnopqrstuvwxyz..."
}
```

**Error Response (422):**
```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

---

### 2. Login User
Authenticates a user and returns a token.

```
POST /auth/login
```

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "email": "elena@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "first_name": "Elena",
    "last_name": "Petrova",
    "email": "elena@example.com",
    "phone": "+1234567890",
    "avatar": null,
    "email_verified_at": null,
    "created_at": "2026-02-05T15:00:00+00:00",
    "updated_at": "2026-02-05T15:00:00+00:00"
  },
  "token": "2|abcdefghijklmnopqrstuvwxyz..."
}
```

**Error Response (422):**
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

---

### 3. Get Current User
Returns the authenticated user's information.

```
GET /auth/user
```

**Headers:**
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "1",
    "first_name": "Elena",
    "last_name": "Petrova",
    "email": "elena@example.com",
    "phone": "+1234567890",
    "avatar": null,
    "email_verified_at": null,
    "created_at": "2026-02-05T15:00:00+00:00",
    "updated_at": "2026-02-05T15:00:00+00:00"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Unauthenticated."
}
```

---

### 4. Logout
Revokes the current authentication token.

```
POST /auth/logout
```

**Headers:**
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## Frontend Integration Guide

### 1. Store the Token
After successful login/register, store the token securely:

```typescript
// In your useAuthStore.ts
const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});

const data = await response.json();
localStorage.setItem('auth_token', data.token);
```

### 2. Use Token for Authenticated Requests
Include the token in the Authorization header:

```typescript
const token = localStorage.getItem('auth_token');

const response = await fetch('http://127.0.0.1:8000/api/v1/auth/user', {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});
```

### 3. Handle Logout
```typescript
await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});
localStorage.removeItem('auth_token');
```

---

## Testing with cURL

### Register:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"first_name":"Elena","last_name":"Petrova","email":"elena@example.com","password":"password123","password_confirmation":"password123"}'
```

### Login:
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"elena@example.com","password":"password123"}'
```

### Get User:
```bash
curl http://127.0.0.1:8000/api/v1/auth/user \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Start the Server

```bash
cd /home/ramzi/projects/backend
php artisan serve
```

The API will be available at `http://127.0.0.1:8000`
