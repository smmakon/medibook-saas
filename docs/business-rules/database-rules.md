# Database Rules

## BR-DB-01 — Appointment Integrity
Appointment must reference:
- patient
- doctor

## BR-DB-02 — Soft Delete
Cancelled appointments are not physically deleted.

## BR-DB-03 — Referential Integrity
Foreign keys required.

## BR-DB-04 — Unique Constraints
Email must be unique.