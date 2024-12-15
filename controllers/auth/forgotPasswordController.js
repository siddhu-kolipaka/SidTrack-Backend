import registeredUsers from "../../models/registeredUsers.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../../mailtrap/emails.js";
import dotenv from "dotenv";
dotenv.config();

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await registeredUsers.findOne({ email });
    if (!user)
      return res
        .status(403)
        .json({ message: "No user with that email exists" });

    // creating reset token for resetting password
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/resetPassword/${resetToken}`,
      user.username
    );

    return res
      .status(200)
      .json({ success: true, message: "Password Reset email sent" });
  } catch (err) {
    console.log("Error handling forgot password", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

export default handleForgotPassword;
