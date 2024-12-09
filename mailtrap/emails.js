import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  VERIFICATION_SUCCESS_TEMPLATE,
  WELCOME_TO_APP_TEMPLATE,
} from "./emailTemplates.js";
import {
  mailtrapClient,
  sender,
  appName,
  HomepageURL,
} from "./emailVerification.js";

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
      )
        .replace("{App Name}", appName)
        .replace("{username}", username),
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
      html: VERIFICATION_SUCCESS_TEMPLATE.replace(
        "{App Name}",
        appName
      ).replace("{username}", username),
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
      subject: "Welcome to our App",
      html: WELCOME_TO_APP_TEMPLATE.replace("{App Name}", appName)
        .replace("{username}", username)
        .replace("{HomepageURL}", HomepageURL),
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
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        .replace("{App Name}", appName)
        .replace("{username}", username),
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
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
        "{App Name}",
        appName
      ).replace("{username}", username),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
  }
};
