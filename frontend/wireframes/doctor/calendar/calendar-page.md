# Doctor Calendar Wireframe

## Page Objective

Allow doctors to manage their schedule, appointments, and availability through an interactive calendar interface.

---

## Page Layout

### Sidebar Navigation

* Dashboard
* My Appointments
* Patients
* Calendar
* Availability
* Messages
* Billing
* Reports
* Settings

---

### Top Navigation Bar

#### Left Section

* Page Title: **My Calendar**
* Subtitle:

  * Manage your schedule and appointments

#### Right Section

* Notifications
* Messages
* Doctor Profile
* Specialty
* Profile Menu

---

## Calendar Controls

### Date Navigation

* Today Button
* Previous Week Button
* Next Week Button
* Current Week Display

Example:

```text
20 – 26 May 2026
```

---

### Calendar View Switcher

* Day View
* Week View
* Month View

Default:

```text
Week View
```

---

### Quick Action Button

Primary Action:

```text
+ New Appointment
```

---

## Weekly Calendar Grid

### Days Displayed

* Monday
* Tuesday
* Wednesday
* Thursday
* Friday
* Saturday
* Sunday

### Time Slots

Display hourly slots:

```text
08:00
09:00
10:00
11:00
12:00
13:00
14:00
15:00
16:00
17:00
18:00
```

---

## Appointment Cards

Each appointment card displays:

### Information

* Patient Name
* Time Range
* Appointment Type

Example:

```text
Sophie Martin

09:00 - 09:30

Consultation
```

---

## Appointment Types

### Consultation

Color:

```text
Blue
```

### Follow-up

Color:

```text
Purple
```

### Emergency

Color:

```text
Red
```

### Teleconsultation

Color:

```text
Orange
```

---

## Weekly Statistics Section

### Statistics Cards

Display:

#### Total Appointments

```text
18
```

#### Confirmed

```text
15
```

#### Pending

```text
3
```

#### Cancelled

```text
0
```

---

## Upcoming Appointments Panel

### Display

* Appointment Time
* Patient Name
* Appointment Type

Example:

```text
Today - 14:00

Imane Kabbaj

Consultation
```

---

## Legend Section

### Color Meaning

| Type             | Color  |
| ---------------- | ------ |
| Consultation     | Blue   |
| Follow-up        | Purple |
| Emergency        | Red    |
| Teleconsultation | Orange |

---

## Quick Actions

Doctor can:

* View appointment details
* Create appointment
* Update appointment
* Cancel appointment
* Mark appointment as completed
* Send reminder
* Open patient profile

---

## Available Modals

### Appointment Details Modal

Display:

* Patient Information
* Date
* Time
* Appointment Type
* Notes
* Status

---

### Update Appointment Modal

Allow modification of:

* Date
* Time
* Type
* Notes

---

### Availability Modal

Allow doctor to:

* Add availability
* Modify availability
* Remove availability

---

### Block Time Slot Modal

Allow doctor to:

* Block vacation periods
* Block unavailable hours

---

## Validation Rules

* Appointments cannot overlap
* Availability cannot overlap blocked periods
* End time must be greater than start time
* Completed appointments cannot be edited
* Doctor can access only assigned appointments

---

## API Used

### GET /api/doctor/calendar

Retrieve calendar data.

### GET /api/doctor/appointments

Retrieve doctor appointments.

### POST /api/doctor/appointments

Create appointment.

### PUT /api/doctor/appointments/:id

Update appointment.

### PATCH /api/doctor/appointments/:id/status

Update status.

### POST /api/doctor/availability

Create availability.

---

## Permissions

### ROLE_DOCTOR

* Access own calendar
* Manage own appointments
* Manage own availability

### ROLE_ADMIN

* Access all calendars
* Manage all appointments

### ROLE_PATIENT

* Access denied

---

## Notifications

### Success

* Appointment created successfully
* Appointment updated successfully
* Reminder sent successfully
* Availability added successfully

### Error

* Appointment conflict detected
* Invalid time range
* Unable to load calendar
* Server error

```
```
