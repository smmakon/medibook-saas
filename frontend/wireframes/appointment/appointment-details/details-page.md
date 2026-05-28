# Appointment Detail Wireframe

## Page Objective

Allow users to view complete details of a medical appointment.

---

## Description

The Appointment Detail page displays all important information related to a specific appointment, including patient details, doctor details, date, time, appointment type, location, status, notes, and available actions.

This page can be accessed by:

* Admin
* Doctor
* Patient

Access level depends on the user role.

---

## Sidebar Navigation

### Patient Sidebar

* Dashboard
* Appointments
* History
* Profile
* Logout

### Doctor Sidebar

* Dashboard
* Appointments
* Patients
* Calendar
* Messages
* Profile
* Logout

### Admin Sidebar

* Dashboard
* Users
* Doctors
* Patients
* Appointments
* Statistics
* Settings
* Logout

---

## Header Section

### Page Title

```text
Appointment Details
```

### Subtitle

```text
View appointment information and available actions
```

### Header Actions

* Back to Appointments
* Export Appointment
* Print Appointment

---

## Appointment Summary Card

Display:

* Appointment ID
* Appointment Status
* Appointment Type
* Appointment Date
* Appointment Time
* Appointment Duration
* Appointment Location

Example:

```text
Appointment ID: RDV-2026-000124
Status: Confirmed
Type: Consultation
Date: 28 May 2026
Time: 09:00 AM
Duration: 30 minutes
Location: Clinique Les Oliviers
```

---

## Patient Information Card

Display:

* Patient photo
* Full name
* Patient ID
* Age
* Gender
* Email
* Phone number
* Address

Example:

```text
Marie Dupont
Patient ID: P-10024
34 years old
Female
marie.dupont@email.com
06 12 34 56 78
```

---

## Doctor Information Card

Display:

* Doctor photo
* Full name
* Specialty
* Email
* Phone number
* Clinic name

Example:

```text
Dr. Yassine Benali
Cardiologist
yassine.benali@medibook.com
+212 6 12 34 56 78
Clinique Les Oliviers
```

---

## Appointment Notes Section

Display:

* Consultation reason
* Patient notes
* Doctor notes
* Internal notes

Example:

```text
Reason: Regular follow-up consultation
Patient Notes: Mild chest discomfort during physical activity
Doctor Notes: Blood pressure should be monitored
```

---

## Status Timeline

Display appointment history events:

* Appointment created
* Appointment confirmed
* Reminder sent
* Appointment completed
* Appointment cancelled

Example:

```text
28 May 2026, 08:00 — Appointment created
28 May 2026, 08:10 — Appointment confirmed
28 May 2026, 08:30 — Reminder sent
```

---

## Available Actions

### Patient Actions

* Cancel Appointment
* Reschedule Appointment
* Download Confirmation
* Back to Appointments

### Doctor Actions

* Confirm Appointment
* Cancel Appointment
* Mark as Completed
* Add Doctor Note
* View Patient Medical History
* Send Reminder

### Admin Actions

* Edit Appointment
* Cancel Appointment
* Delete Appointment
* Reassign Doctor
* View Logs

---

## Status Types

| Status      | Description                          |
| ----------- | ------------------------------------ |
| Pending     | Appointment waiting for confirmation |
| Confirmed   | Appointment confirmed                |
| Completed   | Appointment completed                |
| Cancelled   | Appointment cancelled                |
| Rescheduled | Appointment date/time changed        |

---

## Status Badge Colors

| Status      | Color  |
| ----------- | ------ |
| Pending     | Orange |
| Confirmed   | Green  |
| Completed   | Blue   |
| Cancelled   | Red    |
| Rescheduled | Purple |

---

## Components UI

* Sidebar
* Navbar
* Summary Cards
* Patient Card
* Doctor Card
* Notes Section
* Timeline
* Status Badge
* Action Buttons
* Confirmation Modals
* Toast Notifications

---

## Available Modals

### Cancel Appointment Modal

Fields:

* Cancellation reason
* Confirmation checkbox

Actions:

* Confirm Cancellation
* Cancel

---

### Reschedule Appointment Modal

Fields:

* New date
* New time
* Reason

Actions:

* Confirm Reschedule
* Cancel

---

### Add Doctor Note Modal

Fields:

* Note title
* Medical note
* Visibility

Actions:

* Save Note
* Cancel

---

### Reassign Doctor Modal

Fields:

* New doctor
* Reason

Actions:

* Confirm Reassignment
* Cancel

---

## Validation Rules

* Appointment ID must exist
* User must have permission to view appointment
* Appointment date must be valid
* Cancelled appointments cannot be completed
* Completed appointments cannot be modified
* Rescheduling requires an available time slot
* Cancellation reason may be required depending on business rules
* Doctor notes cannot be empty when submitted

---

## API Used

### GET /api/appointments/:id

Retrieve appointment details.

### PATCH /api/appointments/:id/status

Update appointment status.

### PATCH /api/appointments/:id/reschedule

Reschedule appointment.

### PATCH /api/appointments/:id/cancel

Cancel appointment.

### POST /api/appointments/:id/notes

Add appointment note.

### GET /api/appointments/:id/logs

Retrieve appointment activity logs.

---

## Permissions

### ROLE_PATIENT

* View own appointment details
* Cancel own appointment
* Reschedule own appointment
* Download confirmation

### ROLE_DOCTOR

* View assigned appointment details
* Update appointment status
* Add doctor notes
* View patient medical history

### ROLE_ADMIN

* View all appointment details
* Edit all appointments
* Cancel appointments
* Delete appointments
* Reassign doctors
* View appointment logs

---

## Notifications

### Success

* Appointment loaded successfully
* Appointment updated successfully
* Appointment cancelled successfully
* Appointment rescheduled successfully
* Doctor note added successfully

### Error

* Appointment not found
* Unauthorized access
* Invalid appointment status
* Time slot unavailable
* Server error

```
```
