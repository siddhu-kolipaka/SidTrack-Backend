import mongoose from "mongoose";

const connectDatabase = (URI) => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Mongo DB connected successfully");
    })
    .catch((err) => {
      console.log("Mongo DB connection error", err);
    });
};

export default connectDatabase;
