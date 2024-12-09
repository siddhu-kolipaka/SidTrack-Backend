// modules
import express from "express";
const app = express();
import cors from "cors";
import connectDatabase from "./services/connectDatabase.js";
import verifyJWT from "./middlewares/verifyAccessTokenJWT.js";
import cookieParser from "cookie-parser";

import baseRouter from "./routes/root.js";
import apiRouter from "./routes/api/auth/root.js";

// env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", baseRouter);
app.use("/api/auth", apiRouter);

// jwt verifying middleware
app.use(verifyJWT);

// jwt protected routes
app.get("/hahaha", (req, res) => {
  res.status(200).json({ message: "Went through verifyJWT" });
});

// server listening
app.listen(PORT, () => {
  connectDatabase(MONGO_URI);
  console.log(`Server running on port: ${PORT}`);
});
