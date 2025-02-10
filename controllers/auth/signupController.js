import registeredUsers from "../../models/registeredUsers.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateRefreshTokenAndSetCookie from "../../utils/auth/generateRefreshTokenAndSetCookie.js";
import generateAccessToken from "../../utils/auth/generateAccessToken.js";
import { sendVerificationEmail } from "../../mailtrap/emails.js";
dotenv.config();

const handleUserSignup = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.json({
      message: "Username, Password and Email are all needed to signup",
    });
  }

  const duplicate_email = await registeredUsers.findOne({ email });
  if (duplicate_email)
    return res.status(409).json({ message: "email already used" });

  const duplicate_username = await registeredUsers.findOne({ username });
  if (duplicate_username)
    return res.status(409).json({ message: "Username already taken" });

  try {
    const verificationToken = Math.floor(
      12345 + Math.random() * 987654
    ).toString();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registeredUsers.create({
      email: email,
      username: username,
      password: hashedPassword,
      lastLogin: Date.now(),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1 * 24 * 60 * 60 * 1000,
    });
    await sendVerificationEmail(email, username, verificationToken);
    return res
      .status(201)
      .json({ message: `${username} signed up successfully!` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default handleUserSignup;
