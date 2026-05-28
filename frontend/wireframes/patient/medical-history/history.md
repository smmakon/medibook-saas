# Medical History Wireframe

## Page Objective

Allow doctors to view, review, and manage a patient's medical history in a structured and secure interface.

---

## Description

The Medical History page provides doctors with access to the patient's historical medical data, including consultations, diagnoses, allergies, treatments, prescriptions, notes, and appointment history.

This page helps doctors make informed decisions during consultations while ensuring patient data confidentiality.

---

## Sidebar Navigation

* Dashboard
* Appointments
* Patients
* Calendar
* Medical History
* Reports
* Profile
* Logout

---

## Header Section

### Page Title

```text
Medical History
```

### Subtitle

```text
View and manage patient medical records
```

### Header Actions

* Export Medical Record
* Print Summary
* Add Medical Note

---

## Patient Summary Card

Display:

* Patient photo
* Full name
* Patient ID
* Age
* Gender
* Phone number
* Email
* Last visit date
* Assigned doctor

Example:

```text
Sophie Martin
Patient ID: P-10024
34 years old
Female
Last visit: 22 May 2026
```

---

## Medical Overview Cards

Display:

### Total Consultations

```text
12
```

### Active Treatments

```text
3
```

### Allergies

```text
2
```

### Prescriptions

```text
8
```

---

## Medical Information Sections

### Allergies

Display:

* Allergy name
* Severity level
* Reaction description
* Date recorded

Severity examples:

* Mild
* Moderate
* Severe

---

### Diagnoses

Display:

* Diagnosis name
* Doctor
* Date
* Status
* Notes

Status examples:

* Active
* Resolved
* Monitoring

---

### Treatments

Display:

* Treatment name
* Start date
* End date
* Status
* Instructions

Status examples:

* Ongoing
* Completed
* Suspended

---

### Prescriptions

Display:

* Medication name
* Dosage
* Frequency
* Start date
* End date
* Prescribing doctor

---

## Consultation History Table

### Columns

* Date
* Doctor
* Consultation Type
* Diagnosis
* Notes
* Status
* Actions

---

## Timeline Section

Display chronological events such as:

* Consultation completed
* Diagnosis added
* Prescription created
* Allergy recorded
* Treatment updated

---

## Available Actions

Doctors can:

* View consultation details
* Add medical note
* Edit medical note
* Add prescription
* Add diagnosis
* Add allergy
* Export medical record
* Print medical summary

---

## Available Modals

### Add Medical Note Modal

Fields:

* Note title
* Consultation reference
* Medical note
* Visibility level

---

### Add Diagnosis Modal

Fields:

* Diagnosis name
* Description
* Status
* Date
* Notes

---

### Add Prescription Modal

Fields:

* Medication name
* Dosage
* Frequency
* Duration
* Instructions

---

### Add Allergy Modal

Fields:

* Allergy name
* Severity
* Reaction
* Date recorded

---

## Components UI

* Sidebar
* Navbar
* Patient Summary Card
* Medical Overview Cards
* Tabs
* Data Tables
* Timeline
* Status Badges
* Action Buttons
* Modal Dialogs
* Toast Notifications

---

## Tabs

Recommended tabs:

* Overview
* Consultations
* Diagnoses
* Treatments
* Prescriptions
* Allergies
* Notes

---

## Validation Rules

* Medical note cannot be empty
* Diagnosis name is required
* Prescription medication name is required
* Dosage is required
* Allergy name is required
* Severity must be selected
* Only assigned doctors can update medical history
* Patient medical data must remain confidential

---

## API Used

### GET /api/doctor/patients/:id/medical-history

Retrieve patient medical history.

### POST /api/doctor/patients/:id/medical-notes

Create medical note.

### POST /api/doctor/patients/:id/diagnoses

Create diagnosis.

### POST /api/doctor/patients/:id/prescriptions

Create prescription.

### POST /api/doctor/patients/:id/allergies

Create allergy.

### GET /api/doctor/patients/:id/consultations

Retrieve consultation history.

---

## Permissions

### ROLE_DOCTOR

* View assigned patient medical history
* Add medical notes
* Add diagnoses
* Add prescriptions
* Add allergies

### ROLE_ADMIN

* View medical records according to security policy
* Audit medical data access

### ROLE_PATIENT

* Read-only access to personal medical history if enabled

---

## Security Rules

* Medical history access must be logged
* Sensitive data must not be exposed publicly
* All requests require valid JWT authentication
* Data access must respect role-based permissions
* Medical records must be protected against unauthorized access

---

## Notifications

### Success

* Medical note added successfully
* Diagnosis added successfully
* Prescription created successfully
* Allergy recorded successfully
* Medical history exported successfully

### Error

* Unable to load medical history
* Missing required medical information
* Unauthorized access
* Server error

```
```
