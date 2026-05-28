# Authentication Rules

## BR-AUTH-01 — Authentication Required
User must be authenticated to access protected resources.

## BR-AUTH-02 — JWT Validation
JWT token must:
- be valid
- not expired
- contain user role

## BR-AUTH-03 — Password Security
Passwords must:
- be hashed using bcrypt
- contain minimum 8 characters

## BR-AUTH-04 — Unique Email
Each user must have a unique email address.

## BR-AUTH-05 — Session Expiration
JWT expires after 24h.

## BR-AUTH-06 — Brute Force Protection
Maximum 5 login attempts per minute.