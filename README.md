Features:

1. Uses bcrypt to hash passwords
2. Uses JWT tokens for stateless authentication
3. Uses role based authorisation

Notes:
-> Unprotected routes are for people who just want to view
-> Protected routes are for people who can do something only if they have an account
-> Admin routes are only for the admin to access

Milestones:

🔐 Signup Endpoint
📧 Sending Verify Account Email
🔍 Verify Email Endpoint
📄 Building a Welcome Email Template
🚪 Logout Endpoint
🔑 Login Endpoint
🔄 Forgot Password Endpoint
🔁 Reset Password Endpoint
✔️ Check Auth Endpoint

TO DO when using for other projects:

1. Change the app name and homepage link in mailtrap/emails.js
2. Clear the access token in the auth header and frontend when you logout
3. Change the env variables
