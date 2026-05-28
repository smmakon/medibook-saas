# Validation Rules — Medibook SaaS

## BR-VAL-01 — Mandatory API Request Validation
All incoming API requests must be validated before processing.

Recommended tools:
- Zod
- Joi

---

## BR-VAL-02 — Email Validation
Every user email must:
- follow a valid email format
- be unique in the system

---

## BR-VAL-03 — Password Validation
Passwords must:
- contain at least 8 characters
- be hashed before storage
- never be returned in API responses

---

## BR-VAL-04 — User Role Validation
User role must be one of the following:
- ADMIN
- DOCTOR
- PATIENT

---

## BR-VAL-05 — Appointment Creation Validation
An appointment must contain:
- patientId
- doctorId
- startDate
- endDate
- status

---

## BR-VAL-06 — Appointment Date Validation
Appointments cannot be created:
- in the past
- outside clinic working hours
- during doctor unavailability

---

## BR-VAL-07 — Time Collision Validation
The system must reject an appointment if:
- the doctor already has an appointment at the same time
- the selected slot is already booked

---

## BR-VAL-08 — Appointment Status Validation
Appointment status must be one of:
- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED

---

## BR-VAL-09 — Appointment Cancellation Validation
Cancellation is denied if:
- appointment status is COMPLETED
- appointment status is CANCELLED
- cancellation occurs less than 2 hours before appointment time

---

## BR-VAL-10 — Doctor Availability Validation
Doctor availability must contain:
- doctorId
- dayOfWeek
- startTime
- endTime

---

## BR-VAL-11 — Time Validation
End time must always be greater than start time.

---

## BR-VAL-12 — Pagination Validation
List endpoints must support:
- page
- limit

Default values:
- page = 1
- limit = 10

---

## BR-VAL-13 — Identifier Validation
All identifiers received through API routes must be valid.

Examples:
- userId
- doctorId
- patientId
- appointmentId

---

## BR-VAL-14 — Required Fields Validation
If a required field is missing, the API must return:

HTTP 400 — Bad Request

---

## BR-VAL-15 — User Access Validation
Users may only modify resources allowed by their role.

Examples:
- Patient → own appointments only
- Doctor → own availability only
- Admin → all resources

---

## BR-VAL-16 — File Upload Validation
If file uploads are supported:
- allowed file types only
- maximum file size enforced
- secure file naming required