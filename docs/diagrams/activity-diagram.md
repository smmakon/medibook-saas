# MediBook SaaS - Complete Activity Diagram

## Overview

This activity diagram represents the complete workflow of the MediBook SaaS platform, including:

* Authentication & Authorization
* User Registration
* Patient Management
* Doctor Management
* Appointment Booking
* Appointment Cancellation
* Availability Management
* Notifications
* Medical History
* Administrative Operations

---

## Mermaid Activity Diagram

```mermaid
flowchart TD

START([Start]) --> HOME[Access MediBook SaaS]

HOME --> AUTH_CHOICE{Already registered?}

AUTH_CHOICE -- No --> REGISTER[Create an account]
REGISTER --> REGISTER_FORM[Fill in user information]
REGISTER_FORM --> VALIDATE_REGISTER[Validate input data]
VALIDATE_REGISTER --> REGISTER_OK{Valid data?}

REGISTER_OK -- No --> REGISTER_ERROR[Display validation errors]
REGISTER_ERROR --> REGISTER_FORM

REGISTER_OK -- Yes --> CREATE_USER[Create User]
CREATE_USER --> CREATE_PROFILE{User role}

CREATE_PROFILE -- PATIENT --> CREATE_PATIENT_PROFILE[Create PatientProfile]
CREATE_PROFILE -- DOCTOR --> WAIT_ADMIN[Doctor account created or approved by Admin]
CREATE_PROFILE -- ADMIN --> ADMIN_CREATED[Administrator account created]

CREATE_PATIENT_PROFILE --> LOGIN
WAIT_ADMIN --> LOGIN
ADMIN_CREATED --> LOGIN

AUTH_CHOICE -- Yes --> LOGIN[User Login]

LOGIN --> LOGIN_FORM[Enter email and password]
LOGIN_FORM --> CHECK_CREDENTIALS[Verify credentials]
CHECK_CREDENTIALS --> LOGIN_OK{Credentials valid?}

LOGIN_OK -- No --> LOGIN_ERROR[Display login error]
LOGIN_ERROR --> LOGIN_FORM

LOGIN_OK -- Yes --> GENERATE_TOKEN[Generate JWT]
GENERATE_TOKEN --> CHECK_ROLE{Identify user role}

CHECK_ROLE -- ADMIN --> ADMIN_DASHBOARD[Admin Dashboard]
CHECK_ROLE -- DOCTOR --> DOCTOR_DASHBOARD[Doctor Dashboard]
CHECK_ROLE -- PATIENT --> PATIENT_DASHBOARD[Patient Dashboard]

%% ADMIN FLOW

ADMIN_DASHBOARD --> ADMIN_ACTION{Admin Action}

ADMIN_ACTION --> MANAGE_USERS[Manage Users]
MANAGE_USERS --> USER_ACTION{User Action}

USER_ACTION --> CREATE_DOCTOR[Create Doctor Account]
USER_ACTION --> UPDATE_USER[Update User]
USER_ACTION --> SUSPEND_USER[Suspend User]
USER_ACTION --> VIEW_USERS[View Users List]

CREATE_DOCTOR --> SELECT_SPECIALTY[Assign Specialty]
SELECT_SPECIALTY --> CREATE_DOCTOR_PROFILE[Create DoctorProfile]
CREATE_DOCTOR_PROFILE --> ADMIN_LOG_1[Create Activity Log]

ADMIN_ACTION --> MANAGE_SPECIALTIES[Manage Specialties]
MANAGE_SPECIALTIES --> SPECIALTY_ACTION{Specialty Action}

SPECIALTY_ACTION --> CREATE_SPECIALTY[Create Specialty]
SPECIALTY_ACTION --> UPDATE_SPECIALTY[Update Specialty]
SPECIALTY_ACTION --> DISABLE_SPECIALTY[Disable Specialty]

ADMIN_ACTION --> VIEW_ALL_APPOINTMENTS[View All Appointments]
ADMIN_ACTION --> MANAGE_SETTINGS[Manage System Settings]

%% DOCTOR FLOW

DOCTOR_DASHBOARD --> DOCTOR_ACTION{Doctor Action}

DOCTOR_ACTION --> MANAGE_AVAILABILITY[Manage Availability]
DOCTOR_ACTION --> MANAGE_UNAVAILABILITY[Manage Unavailability]
DOCTOR_ACTION --> VIEW_DOCTOR_APPOINTMENTS[View Doctor Appointments]

VIEW_DOCTOR_APPOINTMENTS --> DOCTOR_APPOINTMENT_ACTION{Appointment Action}

DOCTOR_APPOINTMENT_ACTION --> CONFIRM_APPOINTMENT[Confirm Appointment]
DOCTOR_APPOINTMENT_ACTION --> COMPLETE_APPOINTMENT[Complete Appointment]
DOCTOR_APPOINTMENT_ACTION --> MARK_NO_SHOW[Mark Patient as No-Show]

%% PATIENT FLOW

PATIENT_DASHBOARD --> PATIENT_ACTION{Patient Action}

PATIENT_ACTION --> SEARCH_DOCTOR[Search Doctor]
SEARCH_DOCTOR --> SELECT_SPECIALTY_PATIENT[Choose Specialty]
SELECT_SPECIALTY_PATIENT --> DISPLAY_DOCTORS[Display Available Doctors]
DISPLAY_DOCTORS --> SELECT_DOCTOR[Select Doctor]

SELECT_DOCTOR --> LOAD_CALENDAR[Display Doctor Calendar]
LOAD_CALENDAR --> LOAD_AVAILABILITY[Load Doctor Availability]
LOAD_AVAILABILITY --> LOAD_UNAVAILABILITY[Load Doctor Unavailability]
LOAD_UNAVAILABILITY --> LOAD_EXISTING_APPOINTMENTS[Load Existing Appointments]

LOAD_EXISTING_APPOINTMENTS --> COMPUTE_SLOTS[Calculate Available Time Slots]

COMPUTE_SLOTS --> SLOT_AVAILABLE{Time Slot Available?}

SLOT_AVAILABLE -- No --> NO_SLOT[Display No Available Time Slots]

SLOT_AVAILABLE -- Yes --> SELECT_SLOT[Select Time Slot]
SELECT_SLOT --> ENTER_REASON[Enter Appointment Reason]
ENTER_REASON --> REVIEW_BOOKING[Review Appointment Summary]

REVIEW_BOOKING --> CONFIRM_BOOKING{Confirm Booking?}

CONFIRM_BOOKING -- Yes --> SEND_BOOKING_REQUEST[Send POST /appointments Request]

SEND_BOOKING_REQUEST --> AUTH_MIDDLEWARE[Verify JWT]
AUTH_MIDDLEWARE --> ROLE_MIDDLEWARE[Verify PATIENT Role]
ROLE_MIDDLEWARE --> VALIDATE_BOOKING[Validate Booking Data]

VALIDATE_BOOKING --> BOOKING_VALID{Valid Data?}

BOOKING_VALID -- No --> BOOKING_VALIDATION_ERROR[Return Validation Error]

BOOKING_VALID -- Yes --> CHECK_DOCTOR_AVAILABILITY[Check Doctor Availability]
CHECK_DOCTOR_AVAILABILITY --> CHECK_CONFLICT[Check Appointment Conflict]

CHECK_CONFLICT --> HAS_CONFLICT{Conflict Detected?}

HAS_CONFLICT -- Yes --> CONFLICT_ERROR[Return Conflict Error]

HAS_CONFLICT -- No --> CREATE_APPOINTMENT[Create Appointment]
CREATE_APPOINTMENT --> APPOINTMENT_PENDING[Status = PENDING]

APPOINTMENT_PENDING --> CREATE_NOTIFICATION_PATIENT[Create Patient Notification]
CREATE_NOTIFICATION_PATIENT --> CREATE_NOTIFICATION_DOCTOR[Create Doctor Notification]

CREATE_NOTIFICATION_DOCTOR --> RETURN_SUCCESS[Return Success Response]

PATIENT_ACTION --> VIEW_MY_APPOINTMENTS[View My Appointments]

VIEW_MY_APPOINTMENTS --> PATIENT_APPOINTMENT_ACTION{Appointment Action}

PATIENT_APPOINTMENT_ACTION --> CANCEL_APPOINTMENT[Cancel Appointment]

CANCEL_APPOINTMENT --> CHECK_CANCELLATION_RULES[Check Cancellation Rules]

CHECK_CANCELLATION_RULES --> CANCELLATION_ALLOWED{Cancellation Allowed?}

CANCELLATION_ALLOWED -- Yes --> UPDATE_CANCELLED[Status = CANCELLED]

PATIENT_ACTION --> VIEW_MEDICAL_HISTORY[View Medical History]

PATIENT_ACTION --> UPDATE_PROFILE[Update Patient Profile]

%% NOTIFICATIONS

CREATE_NOTIFICATION_PATIENT --> NOTIFICATION_CENTER[Notification Center]
CREATE_NOTIFICATION_DOCTOR --> NOTIFICATION_CENTER

NOTIFICATION_CENTER --> READ_NOTIFICATION[Read Notification]
READ_NOTIFICATION --> MARK_AS_READ[Mark as Read]

%% END

RETURN_SUCCESS --> END([End])
MARK_AS_READ --> END
VIEW_MEDICAL_HISTORY --> END
UPDATE_PROFILE --> END
```

---

## Main Business Processes

### Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (RBAC)

### Administration

* User Management
* Doctor Management
* Specialty Management
* System Configuration
* Appointment Monitoring

### Doctor Management

* Availability Management
* Unavailability Management
* Appointment Confirmation
* Consultation Completion

### Appointment Management

* Doctor Search
* Appointment Booking
* Appointment Cancellation
* Conflict Detection
* Appointment Status Tracking

### Notifications

* Booking Confirmation
* Appointment Cancellation
* Appointment Updates
* Notification Center

### Patient Features

* Profile Management
* Appointment History
* Medical History
* Appointment Scheduling

```
```
