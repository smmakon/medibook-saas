# Authorization Rules

## BR-RBAC-01 — Role-Based Access
System permissions depend on user role.

Roles:
- ADMIN
- DOCTOR
- PATIENT

## BR-RBAC-02 — Admin Permissions
Admin can:
- manage users
- manage appointments
- manage doctors
- view reports
- suspend users

## BR-RBAC-03 — Doctor Permissions
Doctor can:
- manage own availability
- manage own appointments
- access assigned patients

## BR-RBAC-04 — Patient Permissions
Patient can:
- create appointment
- cancel own appointment
- view own profile