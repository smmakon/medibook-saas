# Login Page Wireframe

## Page Objective

Allow users to securely access the Medibook SaaS platform based on their role.

## Main Sections

### Header

- Medibook Logo
- Application title
- Short subtitle

### Login Form

Fields:

- Email Address
- Password
- Remember Me Checkbox

### Buttons and Links

- Login Button
- Forgot Password Link
- Create Account Link

## UI Components

- Centered authentication card
- Rounded inputs
- Password visibility icon
- Primary blue action button
- Light blue background
- Footer copyright

## Expected Actions

- Authenticate user
- Validate login credentials
- Redirect user according to role:
  - Admin → Admin Dashboard
  - Doctor → Doctor Dashboard
  - Patient → Patient Dashboard
- Redirect to forgot password page
- Redirect to register page

## Validation Rules

- Email is required
- Email must be valid
- Password is required
- Invalid credentials display an error message

## Navigation Flow

```text
Login Page
├── Successful login → Role-based dashboard
├── Forgot password → Forgot Password Page
└── Create account → Register Page