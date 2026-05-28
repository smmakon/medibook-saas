# statistics-page.md

```md id="stt9qm"
# Statistics Page

## Page Objective

Allow administrators to view global statistics and analytics for the Medibook SaaS platform.

---

## Page Description

This page displays analytical system data using statistic cards, charts, and tables.

---

## Main Sections

### Dashboard Overview

Display:

- Total number of patients
- Total number of doctors
- Total number of appointments
- Total revenue generated

---

## Appointment Statistics

Display:

- Completed appointments
- Cancelled appointments
- Pending appointments
- Today's appointments

---

## User Statistics

Display:

- New users
- Active users
- Suspended users

---

## Revenue Statistics

Display:

- Monthly revenue
- Annual revenue
- Recent payments

---

## Charts

### Available Charts

- Appointments by month
- Monthly revenue
- Specialty distribution
- User activity

---

## Filters

- Filter by date
- Filter by specialty
- Filter by doctor

---

## Export Options

### Available Formats

- PDF
- Excel
- CSV

---

## Permissions

### ROLE_ADMIN

Can view all platform statistics.

### ROLE_DOCTOR

Can only view their own statistics.

---

## API Endpoints Used

### GET /api/statistics/global

Retrieve global statistics.

### GET /api/statistics/revenue

Retrieve financial statistics.

### GET /api/statistics/appointments

Retrieve appointment statistics.

---

## UI Components

- Statistic Cards
- Charts
- Tables
- Filters
- Date Picker
- Export Button

---

## Notifications

- Report exported successfully
- Error loading data
- Data updated successfully
```
