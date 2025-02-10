// modules
import express from "express";
const app = express();
import cors from "cors";
import connectDatabase from "./utils/connectDatabase.js";
import cookieParser from "cookie-parser";

import baseRouter from "./routes/root.js";
import authRouter from "./routes/api/auth/root.js";
import stockRouter from "./routes/api/stock/root.js";
import trackerRouter from "./routes/api/tracker/root.js";
import wealthRouter from "./routes/api/wealth/root.js";
import gainsRouter from "./routes/api/gains/root.js";

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
app.use("/api/auth", authRouter);
app.use("/api/stock", stockRouter);
app.use("/api/tracker", trackerRouter);
app.use("/api/wealth", wealthRouter);
app.use("/api/gains", gainsRouter);

// server listening
app.listen(PORT, () => {
  connectDatabase(MONGO_URI);
  console.log(`Server running on port: ${PORT}`);
});
