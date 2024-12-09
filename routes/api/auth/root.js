import express from "express";
const router = express.Router();
import handleUserSignup from "../../../controllers/auth/signupController.js";
import handleUserLogin from "../../../controllers/auth/loginController.js";
import handleRefreshToken from "../../../controllers/auth/refreshTokenController.js";
import handleUserLogout from "../../../controllers/auth/logoutController.js";
import verifyEmail from "../../../controllers/auth/verifyEmailController.js";
import handleForgotPassword from "../../../controllers/auth/forgotPasswordController.js";
import handleResetPassword from "../../../controllers/auth/resetPasswordController.js";
import handleUserDelete from "../../../controllers/auth/deleteAccountController.js";
import verifyJWT from "../../../middlewares/verifyAccessTokenJWT.js";

router.route("/signup").post(handleUserSignup);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(handleUserLogin);
router.route("/refreshToken").get(handleRefreshToken);
router.route("/logout").get(handleUserLogout);
router.route("/forgot-password").post(handleForgotPassword);
router.route("/reset-password/:token").post(handleResetPassword);
router.route("/delete-account").delete(verifyJWT, handleUserDelete);

export default router;
