# Roles and Permissions Documentation — Medibook SaaS

## Overview

This folder contains all Role-Based Access Control (RBAC) documentation for the Medibook SaaS platform.

The system uses RBAC to:
- secure access to resources,
- isolate permissions,
- control business operations,
- protect sensitive patient data.

---

# Available Roles

| Role | Description |
|---|---|
| ADMIN | Full system administrator |
| DOCTOR | Medical professional managing appointments |
| PATIENT | User booking appointments |
| RECEPTIONIST | Administrative assistant *(future role)* |
| SUPER_ADMIN | SaaS owner *(future role)* |

---

# Documentation Structure

| File | Description |
|---|---|
| permissions-matrix.md | Global permissions matrix |
| admin-permissions.md | Administrator permissions |
| doctor-permissions.md | Doctor permissions |
| patient-permissions.md | Patient permissions |

---

# Security Model

The platform uses:
- JWT Authentication
- Role-Based Access Control (RBAC)
- Protected API routes
- Permission validation middleware

---

# Authorization Flow

1. User logs in
2. JWT token generated
3. Token validated
4. User role extracted
5. Permissions checked before route access

---

# Recommended Middleware

```js
authorizeRoles('ADMIN')