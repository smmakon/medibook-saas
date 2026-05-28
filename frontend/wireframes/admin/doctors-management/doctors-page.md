# doctors-management.md

```md id="drm4xq"
# Doctors Management

## Page Objective

Allow administrators to manage doctors registered on the Medibook SaaS platform.

---

## Page Description

This page displays the complete list of doctors registered in the system, along with their main information and available management actions.

---

## Main Sections

### Header

- Page title
- “Add Doctor” button
- Search bar

---

## Doctors Table

### Columns

- Photo
- Full Name
- Email
- Phone Number
- Specialty
- Status
- Availability
- Registration Date
- Actions

---

## Available Actions

### Add Doctor

Allows administrators to create a new doctor account.

### Edit

Allows administrators to update doctor information.

### Suspend

Allows administrators to temporarily deactivate a doctor account.

### Reactivate

Allows administrators to reactivate a suspended doctor account.

### Delete

Allows administrators to permanently remove a doctor account.

### View Details

Allows administrators to view the complete doctor profile.

---

## Filters

- By specialty
- By status
- By availability
- By registration date

---

## Permissions

### ROLE_ADMIN

Full access to all features.

### ROLE_DOCTOR

Access denied.

---

## API Endpoints Used

### GET /api/doctors

Retrieve the list of doctors.

### GET /api/doctors/:id

Retrieve doctor details.

### POST /api/doctors

Create a new doctor.

### PUT /api/doctors/:id

Update doctor information.

### DELETE /api/doctors/:id

Delete a doctor account.

---

## UI Components

- Sidebar
- Navbar
- Data Table
- Search Bar
- Dropdown Filters
- Pagination
- Confirmation Modal
- Toast Notifications

---

## Validation Rules

- Email is required and must be unique
- Valid phone number required
- Specialty is required
- Secure password required

---

## Notifications

- Doctor added successfully
- Information updated successfully
- Account suspended successfully
- Account deleted successfully
- Server error occurred
```
