# User Appointments Wireframe

- Confirmed
- Pending
- Cancelled
- Completed

---

## Available Actions

### View Details
Allow patient to see complete appointment details.

### Download Appointment
Export appointment information.

### Cancel Appointment
Cancel an upcoming appointment.

### Reschedule Appointment
Modify appointment date and time.

---

## Components UI

- Sidebar
- Navbar
- Statistic Cards
- Search Bar
- Filters
- Data Table
- Status Badges
- Pagination
- Export Button
- Action Buttons

---

## Validation Rules

- Only upcoming appointments can be cancelled
- Past appointments cannot be edited
- Appointment rescheduling requires available slots

---

## Notifications

- Appointment cancelled successfully
- Appointment updated successfully
- Error loading appointments
- Appointment exported successfully

---

## API Used

### GET /api/patient/appointments
Retrieve patient appointments.

### GET /api/patient/appointments/:id
Retrieve appointment details.

### PUT /api/patient/appointments/:id
Update appointment.

### DELETE /api/patient/appointments/:id
Cancel appointment.

---

## Permissions

### ROLE_PATIENT
Can manage only personal appointments.

### ROLE_ADMIN
Can access all appointments.