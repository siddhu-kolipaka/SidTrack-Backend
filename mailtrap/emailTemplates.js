import dotenv from "dotenv";
dotenv.config();

const appName = `${process.env.APPNAME}`;
const HomepageURL = `${process.env.CLIENT_URL}`;

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {username}</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>${appName} Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const VERIFICATION_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Successful</title>
  <style>
    body {
      font-family: 'Arial', sans-serif; 
      background-color: #f0f4f8; 
      margin: 0; 
      padding: 20px; 
      color: #333; 
    }
    .container {
      max-width: 600px; 
      margin: auto; 
      background: white; 
      border-radius: 8px; 
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden; 
    }
    .header {
      background: linear-gradient(135deg, #4CAF50, #45a049);
      padding: 40px; 
      text-align: center; 
      color: white; 
    }
    .header h1 {
      margin: 0; 
      font-size: 28px; 
      font-weight: normal; 
    }
    .content {
      padding: 20px; 
      font-size: 16px; 
      line-height: 1.5; 
    }
    .checkmark {
      font-size: 50px; 
      color: #4CAF50; 
      text-align: center; 
      margin: 20px 0; 
    }
    .footer {
      text-align: center; 
      font-size: 0.8em; 
      color: #888; 
      padding: 20px; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verification Successful</h1>
    </div>
    <div class="content">
      <p>Hello, {username}</p>
      <p>Your email address has been successfully verified!</p>
      <div class="checkmark">✓</div>
      <p>Thank you for confirming your email. You can now access all the features of your account.</p>
      <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
      <p>Best regards,<br>${appName} Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_TO_APP_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${appName}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif; 
      background-color: #f0f4f8; 
      margin: 0; 
      padding: 20px; 
      color: #333; 
    }
    .container {
      max-width: 600px; 
      margin: auto; 
      background: white; 
      border-radius: 8px; 
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden; 
    }
    .header {
      background: linear-gradient(135deg, #4CAF50, #45a049);
      padding: 40px; 
      text-align: center; 
      color: white; 
    }
    .header h1 {
      margin: 0; 
      font-size: 28px; 
      font-weight: normal; 
    }
    .content {
      padding: 20px; 
      font-size: 16px; 
      line-height: 1.5; 
    }
    .button {
      display: inline-block; 
      background-color: #4CAF50; 
      color: white; 
      padding: 12px 20px; 
      text-decoration: none; 
      border-radius: 5px; 
      font-weight: bold; 
      margin: 20px auto; 
      text-align: center; 
    }
    .footer {
      text-align: center; 
      font-size: 0.8em; 
      color: #888; 
      padding: 20px; 
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ${appName}!</h1>
    </div>
    <div class="content">
      <p>Hello, {username}</p>
      <p>We're excited to have you join the ${appName} community! You've taken the first step towards better managing your expenses.</p>
      <p>Here are a few things you can do to get started:</p>
      <ul>
        <li>Explore our features</li>
        <li>Set up your budget</li>
        <li>Track your spending</li>
      </ul>
      <p>To dive right in, click the button below:</p>
      <a href="${HomepageURL}" class="button">Open App</a>
      <p>If you have any questions or need assistance, our support team is here to help!</p>
      <p>Welcome aboard,<br>${appName} Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {username}</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>${appName} Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {username}</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href=" {resetURL} " style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>${appName} Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
