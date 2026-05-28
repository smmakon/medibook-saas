# Admin Rules — Medibook SaaS

# 1. Overview

The ADMIN role is responsible for managing and supervising the Medibook SaaS platform.

Administrators have full operational access to:

* users,
* appointments,
* doctors,
* dashboards,
* reports,
* system configuration.

The ADMIN role ensures:

* platform security,
* business process control,
* data integrity,
* user management.

---

# 2. User Management Rules

## BR-ADMIN-01 — Create Users

ADMIN may create:

* patients,
* doctors,
* receptionists,
* administrators.

### Required Fields

* firstName
* lastName
* email
* password
* role

### Validation Rules

* email must be unique
* password minimum 8 characters
* role must be valid

---

## BR-ADMIN-02 — Update Users

ADMIN may:

* update user profile information,
* modify account status,
* update contact information,
* assign departments.

---

## BR-ADMIN-03 — Delete Users

ADMIN may delete users only if:

* no critical dependency exists,
* no active appointments are linked.

### Recommended Strategy

Soft delete preferred.

Example:

```js
isActive = false
```

---

## BR-ADMIN-04 — Suspend Users

ADMIN may temporarily suspend accounts.

Suspended users cannot:

* login,
* access protected routes,
* create appointments.

---

## BR-ADMIN-05 — Restore Users

ADMIN may reactivate suspended accounts.

---

## BR-ADMIN-06 — Reset Passwords

ADMIN may force password reset for any user account.

---

# 3. Role Management Rules

## BR-ADMIN-07 — Assign Roles

ADMIN may assign:

* DOCTOR
* PATIENT
* RECEPTIONIST

roles during account creation.

---

## BR-ADMIN-08 — Role Validation

Assigned roles must exist in RBAC system.

Allowed roles:

* ADMIN
* DOCTOR
* PATIENT
* RECEPTIONIST
* SUPER_ADMIN

---

## BR-ADMIN-09 — Permission Restrictions

ADMIN cannot create custom permissions outside predefined RBAC rules.

---

# 4. Appointment Management Rules

## BR-ADMIN-10 — Global Appointment Access

ADMIN may:

* view all appointments,
* search appointments,
* filter appointments,
* export appointment reports.

---

## BR-ADMIN-11 — Appointment Modification

ADMIN may:

* update appointment details,
* reschedule appointments,
* modify statuses,
* force confirmations.

---

## BR-ADMIN-12 — Appointment Cancellation

ADMIN may cancel any appointment.

### Required Logs

Cancellation must record:

* adminId
* appointmentId
* timestamp
* cancellation reason

---

## BR-ADMIN-13 — Appointment Deletion

Hard deletion is prohibited in production environments.

Recommended approach:

```js
status = 'CANCELLED'
```

---

# 5. Doctor Management Rules

## BR-ADMIN-14 — Create Doctor Profiles

ADMIN may create doctor accounts.

### Required Fields

* fullName
* email
* specialization
* availability schedule

---

## BR-ADMIN-15 — Manage Doctor Availability

ADMIN may:

* configure doctor schedules,
* define clinic hours,
* manage vacations,
* disable availability.

---

## BR-ADMIN-16 — Daily Appointment Limits

ADMIN may configure:

* maximum appointments per day,
* slot duration,
* consultation duration.

---

# 6. Patient Management Rules

## BR-ADMIN-17 — Access Patient Records

ADMIN may access all patient profiles.

---

## BR-ADMIN-18 — Archive Patient Accounts

Patient accounts may be archived instead of permanently deleted.

---

## BR-ADMIN-19 — Medical Data Protection

Sensitive medical information access must be logged.

---

# 7. Dashboard Rules

## BR-ADMIN-20 — Access Admin Dashboard

ADMIN dashboard includes:

* users management,
* appointments,
* analytics,
* reports,
* system activity.

---

## BR-ADMIN-21 — Access Statistics

ADMIN may access:

* total appointments,
* cancellation statistics,
* doctor performance,
* active users,
* system usage reports.

---

# 8. Audit and Logs Rules

## BR-ADMIN-22 — Audit Log Access

ADMIN may access:

* authentication logs,
* appointment logs,
* activity history,
* security events.

---

## BR-ADMIN-23 — Critical Action Logging

The following actions must always be logged:

* user deletion,
* role changes,
* appointment cancellation,
* password reset,
* account suspension.

---

## BR-ADMIN-24 — Log Content

Each log must contain:

* userId
* action
* timestamp
* IP address
* affected resource

---

# 9. Security Rules

## BR-ADMIN-25 — Protected Routes

All admin routes require:

* valid JWT token,
* ADMIN role verification.

---

## BR-ADMIN-26 — Session Expiration

Admin sessions expire automatically after configured duration.

Example:

```text
24 hours
```

---

## BR-ADMIN-27 — Brute Force Protection

Authentication attempts are limited.

Example:

```text
5 attempts per minute
```

---

## BR-ADMIN-28 — Password Security

Passwords must:

* be hashed using bcrypt,
* never be exposed,
* respect minimum complexity requirements.

---

# 10. Notification Rules

## BR-ADMIN-29 — Administrative Notifications

ADMIN receives:

* security alerts,
* suspicious login attempts,
* critical system errors.

---

## BR-ADMIN-30 — User Notifications

ADMIN may trigger:

* appointment reminders,
* cancellation notifications,
* password reset emails.

---

# 11. Restrictions

## BR-ADMIN-31 — Infrastructure Restrictions

ADMIN cannot:

* manage cloud infrastructure,
* configure billing systems,
* access SUPER_ADMIN infrastructure settings.

---

# 12. API Authorization Rules

## BR-ADMIN-32 — Authorization Middleware

Recommended middleware:

```js
authorizeRoles('ADMIN')
```

---

## BR-ADMIN-33 — Unauthorized Access

Unauthorized access returns:

```http
403 Forbidden
```

Unauthenticated access returns:

```http
401 Unauthorized
```

---

# 13. Recommended Prisma Enum

```prisma
enum Role {
  ADMIN
  DOCTOR
  PATIENT
  RECEPTIONIST
  SUPER_ADMIN
}
```

---

# 14. Recommended Backend Structure

```text
backend/src/
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│
├── permissions/
│   ├── adminPermissions.js
│
├── rules/
│   ├── adminRules.js
```

---

# 15. Recommended Validation Example

```js
if (user.role !== 'ADMIN') {
  throw new Error('Access denied')
}
```
