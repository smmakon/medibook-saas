# settings-page.md

```md id="set7xp"
# Settings Page

## Page Objective

Allow administrators to configure global settings for the Medibook SaaS platform.

---

## Page Description

This page allows administrators to manage system settings, security, notifications, and general platform configurations.

---

## Main Sections

### General Settings

- Platform name
- Logo
- Language
- Time zone

---

## User Management

- Automatic account activation
- Password policy
- Role management

---

## Notifications

- Email notifications
- SMS notifications
- System notifications

---

## Security

- JWT expiration
- Two-factor authentication
- Session management
- Login history

---

## Appointment Management

- Appointment duration
- Available schedules
- Cancellation policy

---

## Payments

- Payment methods
- Currency
- Taxes
- Billing

---

## Permissions

### ROLE_ADMIN

Full access to all settings.

### ROLE_DOCTOR

Access denied.

---

## API Endpoints Used

### GET /api/settings

Retrieve system settings.

### PUT /api/settings

Update system settings.

---

## UI Components

- Sidebar
- Navbar
- Forms
- Tabs
- Toggle Switches
- Upload Component
- Save Button

---

## Validation Rules

- Required fields validation
- Email validation
- Password security validation
- Logo validation

---

## Notifications

- Settings saved successfully
- Error saving settings
- Settings reset successfully
```
