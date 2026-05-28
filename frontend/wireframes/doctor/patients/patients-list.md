# Doctor Patient List Wireframe

## Page Objective

Allow doctors to view, search, and manage patients assigned to them.

---

## Description

This page provides doctors with a complete overview of their patients, including personal information, appointment statistics, medical follow-up status, and quick access to patient-related actions.

---

## Sidebar Navigation

* Dashboard
* Appointments
* Patients
* Calendar
* Reports
* Settings
* Logout

---

## Header Section

### Page Title

```text
My Patients
```

### Subtitle

```text
View and manage your patients
```

### Header Actions

* Export Patients
* Print List
* Add Patient (optional)

---

## Search and Filters

### Search Bar

Search patient by:

* Name
* Email
* Phone Number

Placeholder:

```text
Search by name, email or phone...
```

### Filters

#### Status

* All Status
* Active
* Inactive
* Blocked

#### Gender

* All Gender
* Male
* Female

#### Age Range

* All Ages
* Children
* Adults
* Seniors

#### Last Visit

* Today
* This Week
* This Month
* All Time

---

## Patients Table

### Columns

| Column             | Description              |
| ------------------ | ------------------------ |
| #                  | Record Number            |
| Photo              | Patient Avatar           |
| Patient            | Full Name                |
| Age / Gender       | Age and Gender           |
| Email              | Patient Email            |
| Phone              | Patient Phone Number     |
| Last Visit         | Most Recent Consultation |
| Total Appointments | Number of Appointments   |
| Status             | Current Status           |
| Actions            | Available Actions        |

---

## Example Patient Row

| Patient       | Age | Email                                       | Phone          | Last Visit  |
| ------------- | --- | ------------------------------------------- | -------------- | ----------- |
| Sophie Martin | 34  | [sophie@email.com](mailto:sophie@email.com) | 06 12 34 56 78 | 22 May 2026 |

---

## Patient Status

### Active

Badge Color:

```text
Green
```

### Inactive

Badge Color:

```text
Gray
```

### Blocked

Badge Color:

```text
Red
```

---

## Available Actions

### View Profile

Display:

* Personal Information
* Medical Information
* Contact Information

---

### View Appointment History

Display:

* Past Appointments
* Upcoming Appointments
* Appointment Statistics

---

### Create Appointment

Allow doctor to schedule a new appointment.

---

### Send Message

Allow doctor to contact patient.

---

### More Options

* Edit Patient
* Deactivate Patient
* Archive Patient

---

## Pagination

Display:

```text
Showing 1 to 10 of 86 patients
```

Controls:

* Previous Page
* Next Page
* Page Numbers

---

## Statistics Summary

Optional cards displayed above the table:

### Total Patients

```text
86
```

### Active Patients

```text
74
```

### New Patients This Month

```text
12
```

### Upcoming Consultations

```text
18
```

---

## Components UI

* Sidebar
* Navbar
* Search Bar
* Filters
* Data Table
* Status Badges
* Action Buttons
* Pagination
* Export Button
* Toast Notifications

---

## Available Modals

### Patient Details Modal

Display:

* Patient Photo
* Full Name
* Contact Information
* Address
* Medical Notes
* Emergency Contact

---

### Appointment History Modal

Display:

* Appointment Date
* Doctor
* Consultation Type
* Status

---

### Create Appointment Modal

Fields:

* Appointment Date
* Time
* Type
* Notes

---

### Send Message Modal

Fields:

* Subject
* Message

---

## Validation Rules

* Search term must contain at least 2 characters
* Email must be valid
* Phone number must be valid
* Appointment date must be in the future
* Patient status must be valid

---

## API Used

### GET /api/doctor/patients

Retrieve all doctor patients.

### GET /api/doctor/patients/:id

Retrieve patient details.

### GET /api/doctor/patients/:id/appointments

Retrieve patient appointment history.

### POST /api/doctor/appointments

Create appointment.

### POST /api/messages

Send patient message.

---

## Permissions

### ROLE_DOCTOR

* View assigned patients
* Create appointments
* View patient history
* Send messages

### ROLE_ADMIN

* View all patients
* Manage all patient records

### ROLE_PATIENT

* Access denied

---

## Notifications

### Success

* Patient details loaded successfully
* Appointment created successfully
* Message sent successfully

### Error

* Error loading patient list
* Error creating appointment
* Error sending message
* Server unavailable

```
```
