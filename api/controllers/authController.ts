import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import HttpException from "../exceptions/HttpException";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash
    });

    await newUser.save();
    res.status(200).json("User has been created.");
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(new HttpException(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(new HttpException(400, "Wrong password or username!"));

    const { _id, username, email, isAdmin, createdAt, updatedAt } = user;
    const token = jwt.sign({ id: _id, isAdmin }, process.env.JWT_SECRET as string);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { _id, username, email, createdAt, updatedAt }, isAdmin });
  } catch (error) {
    next(error);
  }
};
