import mongoose from "mongoose";

const dbUri = process.env.MONGO_DB_URI ?? "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
