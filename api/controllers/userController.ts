import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: `No user exists with id: ${id}` });
      return;
    }

    user.set(req.body);
    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: `No user exists with id: ${id}` });
      return;
    }

    res.status(200).json({ message: "User has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: `No user exists with id: ${id}` });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
