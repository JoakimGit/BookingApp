require("dotenv").config();
import express from "express";
import connectDB from "./config/database";
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import lodgingsRoute from "./routes/lodgings";
import roomsRoute from "./routes/rooms";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler";
import cors from "cors";

const app = express();
connectDB();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/lodgings", lodgingsRoute);
app.use("/api/rooms", roomsRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app
  .listen(PORT, () => {
    console.log(`express is listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
