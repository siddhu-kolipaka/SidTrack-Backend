import express from "express";
const router = express.Router();
import handleUserSignup from "../../../controllers/auth/signupController.js";
import handleUserLogin from "../../../controllers/auth/loginController.js";
import getNewAccessToken from "../../../controllers/auth/getNewAccessTokenController.js";
import handleUserLogout from "../../../controllers/auth/logoutController.js";
import verifyEmail from "../../../controllers/auth/verifyEmailController.js";
import handleForgotPassword from "../../../controllers/auth/forgotPasswordController.js";
import handleResetPassword from "../../../controllers/auth/resetPasswordController.js";
import handleUserDelete from "../../../controllers/auth/deleteAccountController.js";
import sendVerificationTokenController from "../../../controllers/auth/sendVerificationTokenController.js";
import verifyAccessToken from "../../../middlewares/verifyAccessTokenJWT.js";

router.route("/signup").post(handleUserSignup);
router.route("/verify-email").post(verifyEmail);
router.route("/send-verification-token").post(sendVerificationTokenController);
router.route("/login").post(handleUserLogin);
router.route("/new-access-token").get(getNewAccessToken);
router.route("/logout").post(handleUserLogout);
router.route("/forgot-password").post(handleForgotPassword);
router.route("/reset-password/:token").post(handleResetPassword);
router.route("/delete-account").post(verifyAccessToken, handleUserDelete);

export default router;
