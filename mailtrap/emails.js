import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  VERIFICATION_SUCCESS_TEMPLATE,
  WELCOME_TO_APP_TEMPLATE,
} from "./emailTemplates.js";

const appName = `${process.env.APPNAME}`;
const HomepageURL = `${process.env.CLIENT_URL}`;

const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: appName,
};

export const sendVerificationEmail = async (
  email,
  username,
  verificationToken
) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ).replace("{username}", username),
      category: "Email Verification",
    });
  } catch (error) {
    console.error(`Error sending verification mail`, error);
  }
};

export const sendVerificationSuccessMail = async (email, username) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verification Successful",
      html: VERIFICATION_SUCCESS_TEMPLATE.replace("{username}", username),
      category: "Verification Successful",
    });
  } catch (error) {
    console.error(`Error sending verification successful mail`, error);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: `Welcome to ${appName}`,
      html: WELCOME_TO_APP_TEMPLATE.replace("{username}", username),
      category: "Welcome",
    });
  } catch (error) {
    console.error(`Error sending welcome mail`, error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL, username) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ).replace("{username}", username),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset email`, error);
  }
};

export const sendResetSuccessEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{username}", username),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
  }
};
