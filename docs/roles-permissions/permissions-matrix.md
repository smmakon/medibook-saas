
---

# `docs/roles-permissions/permissions-matrix.md`

```md
# Permissions Matrix — Medibook SaaS

| Action | ADMIN | DOCTOR | PATIENT |
|---|---|---|---|
| Login | ✅ | ✅ | ✅ |
| Logout | ✅ | ✅ | ✅ |
| View own profile | ✅ | ✅ | ✅ |
| Update own profile | ✅ | ✅ | ✅ |
| Change password | ✅ | ✅ | ✅ |
| Create users | ✅ | ❌ | ❌ |
| View all users | ✅ | ❌ | ❌ |
| Update users | ✅ | ❌ | ❌ |
| Delete users | ✅ | ❌ | ❌ |
| Suspend users | ✅ | ❌ | ❌ |
| Create appointment | ✅ | ❌ | ✅ |
| View appointments | ✅ | ✅ | Own only |
| Update appointment | ✅ | ✅ | Own only |
| Cancel appointment | ✅ | ✅ | Own only |
| Delete appointment | ✅ | ❌ | ❌ |
| Manage doctor schedules | ✅ | ✅ | ❌ |
| Manage availability | ✅ | ✅ | ❌ |
| Access dashboard | ✅ | ✅ | ✅ |
| Access analytics | ✅ | ❌ | ❌ |
| Access audit logs | ✅ | ❌ | ❌ |
| Manage roles | ✅ | ❌ | ❌ |
| Access patient records | ✅ | Assigned only | ❌ |
| Upload documents | ✅ | ✅ | ✅ |
| Access system settings | ✅ | ❌ | ❌ |