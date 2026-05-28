# Doctor Appointments Wireframe
View complete appointment details.

### Edit Appointment
Modify appointment information.

### Update Status
Confirm, cancel, or complete appointment.

### Export Appointment
Download appointment information.

---

## Statistics Section

Display:

- Appointments Today
- Confirmed Appointments
- Pending Appointments
- Cancelled Appointments

---

## Components UI

- Sidebar
- Navbar
- Statistic Cards
- Data Table
- Filters
- Search Bar
- Export Button
- Pagination
- Status Badges
- Modal Confirmation

---

## Validation Rules

- Appointment times cannot overlap
- Doctors can only access assigned appointments
- Completed appointments cannot be edited
- Patient information must remain protected

---

## Notifications

- Appointment updated successfully
- Appointment confirmed
- Appointment cancelled
- Data loading error

---

## API Used

### GET /api/doctor/appointments
Retrieve doctor appointments.

### GET /api/doctor/appointments/:id
Retrieve appointment details.

### PUT /api/doctor/appointments/:id
Update appointment.

### PATCH /api/doctor/appointments/:id/status
Update appointment status.

---

## Permissions

### ROLE_DOCTOR
Can manage only assigned appointments.

### ROLE_ADMIN
Can access all appointments.