# Doctor Profile Wireframe

## Page Objective

Allow doctors to view and manage their professional profile, personal information, medical specialties, availability, and account settings.

---

## Description

This page allows doctors to maintain their profile information visible to patients and administrators. Doctors can update their contact details, medical information, profile picture, availability, and security settings.

---

## Sidebar Navigation

* Dashboard
* Appointments
* Patients
* Calendar
* Availability
* Messages
* Billing
* Reports
* Profile
* Logout

---

## Header Section

### Page Title

```text
My Profile
```

### Subtitle

```text
Manage your professional information and account settings
```

---

## Profile Overview Card

### Doctor Information

Display:

* Profile Picture
* Full Name
* Medical Specialty
* License Number
* Professional Status
* Years of Experience

Example:

```text
Dr. Yassine Benali

Cardiologist

License: MED-2026-001

12 Years Experience
```

---

## Personal Information Section

### Fields

* First Name
* Last Name
* Date of Birth
* Gender
* Email Address
* Phone Number

---

## Professional Information Section

### Fields

* Medical Specialty
* Sub-Specialty
* Medical License Number
* Years of Experience
* Clinic Name
* Professional Biography

---

## Address Information Section

### Fields

* Country
* Province / State
* City
* Postal Code
* Address

---

## Availability Settings

### Weekly Availability

Display:

* Monday
* Tuesday
* Wednesday
* Thursday
* Friday
* Saturday
* Sunday

Each day contains:

* Start Time
* End Time
* Availability Status

Example:

```text
Monday

08:00 - 17:00

Available
```

---

## Security Settings

### Change Password

Fields:

* Current Password
* New Password
* Confirm Password

### Two-Factor Authentication

Options:

* Enable 2FA
* Disable 2FA

---

## Profile Picture Section

### Features

* Upload New Picture
* Remove Picture
* Preview Avatar

Accepted Formats:

* JPG
* PNG
* WEBP

Maximum Size:

```text
5 MB
```

---

## Statistics Section

Display:

### Total Patients

```text
248
```

### Total Appointments

```text
1,256
```

### Upcoming Appointments

```text
18
```

### Average Rating

```text
4.8 / 5
```

---

## Action Buttons

### Save Changes

```text
Save Profile
```

### Change Password

```text
Update Password
```

### Upload Picture

```text
Upload Image
```

---

## Components UI

* Sidebar
* Navbar
* Profile Card
* Statistics Cards
* Forms
* File Upload Component
* Toggle Switches
* Time Pickers
* Save Button
* Toast Notifications

---

## Available Modals

### Edit Profile Modal

Allow modification of:

* Personal Information
* Professional Information
* Address Information

---

### Upload Profile Picture Modal

Allow:

* Upload image
* Crop image
* Preview image

---

### Change Password Modal

Allow secure password update.

---

## Validation Rules

### Personal Information

* First Name required
* Last Name required
* Valid email required
* Valid phone number required

### Professional Information

* Specialty required
* License Number required
* Experience cannot be negative

### Password

* Minimum 8 characters
* One uppercase letter
* One lowercase letter
* One number
* One special character

### Profile Picture

* Only JPG, PNG, WEBP
* Maximum 5 MB

---

## API Used

### GET /api/doctor/profile

Retrieve doctor profile.

### PUT /api/doctor/profile

Update doctor profile.

### PUT /api/doctor/password

Update password.

### POST /api/doctor/profile/avatar

Upload profile picture.

### DELETE /api/doctor/profile/avatar

Remove profile picture.

### PUT /api/doctor/availability

Update availability.

---

## Permissions

### ROLE_DOCTOR

* View own profile
* Edit own profile
* Update availability
* Change password
* Upload profile picture

### ROLE_ADMIN

* View all doctor profiles
* Manage doctor accounts

### ROLE_PATIENT

* Read-only access to public doctor information

---

## Notifications

### Success

* Profile updated successfully
* Password updated successfully
* Profile picture uploaded successfully
* Availability updated successfully

### Error

* Invalid form data
* Upload failed
* Password mismatch
* Server error

```
```
