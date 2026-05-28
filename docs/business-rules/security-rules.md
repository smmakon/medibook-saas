# Security Rules

## BR-SEC-01 — Protected Routes
Private routes require JWT.

## BR-SEC-02 — Environment Variables
Sensitive values stored in `.env`.

## BR-SEC-03 — Password Hashing
Passwords hashed with bcrypt.

## BR-SEC-04 — API Validation
All requests validated using:
- Zod
or
- Joi

## BR-SEC-05 — CORS Restriction
Frontend domain only allowed.