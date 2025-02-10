import registeredUsers from "../../models/registeredUsers.js";
import {
  sendVerificationSuccessMail,
  sendWelcomeEmail,
} from "../../mailtrap/emails.js";

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const user = await registeredUsers.findOne({
      verificationToken,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendVerificationSuccessMail(user.email, user.username);
    await sendWelcomeEmail(user.email, user.username);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
        refreshToken: undefined,
        isBlacklisted: undefined,
        __v: undefined,
        _id: undefined,
        roles: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default verifyEmail;
