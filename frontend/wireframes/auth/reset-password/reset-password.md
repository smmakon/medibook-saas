# reset-password.md

````md id="h2k9xp"
# Reset Password Wireframe

## Page Objective

Allow users to create a new password after opening a valid password reset link.

---

## Main Sections

### Header

- Medibook Logo
- Page title
- Short security instruction

---

### Reset Password Form

#### Fields

- New Password
- Confirm New Password

---

### Buttons and Links

- Reset Password Button
- Back to Login Link

---

## UI Components

- Centered authentication card
- Password input fields
- Password visibility icons
- Primary blue action button
- Security information message

---

## Expected Actions

- Validate reset token
- Allow user to enter a new password
- Confirm both passwords match
- Update password securely
- Redirect user to login page

---

## Validation Rules

- Reset token must be valid
- Reset token must not be expired
- New password is required
- Password must contain at least 8 characters
- Confirm password must match new password
- Password must be hashed before storage

---

## Success Message

```text
Your password has been reset successfully. You can now log in.
````

```
```
