require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
const app = express();
import connectDB from "./config/database";
import authRoute from "./routes/auth";
import userRoute from "./routes/users";
import hotelsRoute from "./routes/hotels";
import roomsRoute from "./routes/rooms";
import HttpException from "./exceptions/HttpException";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(status).send({
    status,
    message
  });
});

const PORT = process.env.PORT || 8080;

app
  .listen(PORT, () => {
    console.log(`express is listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
