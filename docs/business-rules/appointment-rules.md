# Appointment Rules

## BR-APP-01 — Authentication Required
Patient must be logged in to create appointment.

## BR-APP-02 — Doctor Availability Validation
Appointment allowed only if doctor is available.

## BR-APP-03 — No Time Collision
Two appointments cannot overlap for same doctor.

## BR-APP-04 — Appointment Date Validation
Appointment cannot:
- be in the past
- exceed clinic hours
- occur during doctor absence

## BR-APP-05 — Appointment Duration
Each appointment contains:
- startDate
- endDate
- calculated duration

## BR-APP-06 — Appointment Status
Allowed statuses:
- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED

## BR-APP-07 — Daily Appointment Limit
Doctor has maximum daily appointment limit.

## BR-APP-08 — Appointment History
All actions must be logged.