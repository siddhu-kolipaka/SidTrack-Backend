import registeredUsers from "../../models/registeredUsers.js";
import { sendVerificationEmail } from "../../mailtrap/emails.js";

const sendVerificationTokenController = async (req, res) => {
  const { email } = req.body;
  const user = await registeredUsers.findOne({
    email,
  });
  if (!user)
    return res.status(400).json({ message: "No user with such email exists" });
  try {
    const verificationToken = Math.floor(
      12345 + Math.random() * 987654
    ).toString();
    const { username } = user;
    await registeredUsers.findOneAndUpdate(
      { email },
      {
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 1 * 24 * 60 * 60 * 1000,
      }
    );
    await sendVerificationEmail(email, username, verificationToken);
    return res
      .status(201)
      .json({ message: `${username} verified successfully!` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default sendVerificationTokenController;
