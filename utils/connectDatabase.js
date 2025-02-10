import mongoose from "mongoose";
import quote from "./stock/quote.js";

const connectDatabase = async (URI) => {
  let isRunning = false;

  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");
    await quote();

    const intervalId = setInterval(async () => {
      if (isRunning) {
        console.log(
          "Previous quote update still running. Skipping this interval."
        );
        return;
      }

      isRunning = true;
      try {
        await quote();
      } catch (error) {
        console.error("Error running quote update:", error);
      } finally {
        isRunning = false;
      }
    }, 60 * 1000);

    process.on("SIGINT", async () => {
      console.log("Shutting down gracefully...");
      clearInterval(intervalId);
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDatabase;
