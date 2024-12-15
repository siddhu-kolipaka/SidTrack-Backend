import { sendResetSuccessEmail } from "../../mailtrap/emails.js";
import registeredUsers from "../../models/registeredUsers.js";
import bcrypt from "bcrypt";

const handleResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await registeredUsers.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // updating password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordExpiresAt = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email, user.username);
    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.log("Error resetting password", err);
    return res.status(400).json({ success: false, message: err.message });
  }
};

export default handleResetPassword;
