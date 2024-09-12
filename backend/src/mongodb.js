import mongoose from "mongoose";

const connectDB = (callback) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully!");
      if (typeof callback === "function") callback();
    })
    .catch((error) => {
      console.log("Error while connect mongodb: ", error);
    });
};

export default connectDB;
