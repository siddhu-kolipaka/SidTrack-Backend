// emails.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  VERIFICATION_SUCCESS_TEMPLATE,
  WELCOME_TO_APP_TEMPLATE,
} from "./emailTemplates.js";

const appName = process.env.APPNAME;
const HomepageURL = process.env.CLIENT_URL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sender = process.env.GMAIL_USER;

export const sendVerificationEmail = async (
  email,
  username,
  verificationToken
) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  ).replace("{username}", username);

  const mailOptions = {
    from: sender,
    to: email,
    subject: "Verify your email",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email", error);
  }
};

export const sendVerificationSuccessMail = async (email, username) => {
  const htmlContent = VERIFICATION_SUCCESS_TEMPLATE.replace(
    "{username}",
    username
  );
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Verification Successful",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification success email sent successfully");
  } catch (error) {
    console.error("Error sending verification success email", error);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const htmlContent = WELCOME_TO_APP_TEMPLATE.replace("{username}", username);
  const mailOptions = {
    from: sender,
    to: email,
    subject: `Welcome to ${appName}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email", error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL, username) => {
  const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetURL
  ).replace("{username}", username);
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Reset your password",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email", error);
  }
};

export const sendResetSuccessEmail = async (email, username) => {
  const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
    "{username}",
    username
  );
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Password Reset Successful",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.error("Error sending password reset success email", error);
  }
};
