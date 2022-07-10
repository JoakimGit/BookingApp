import { NextFunction, Request, Response } from "express";
import Hotel from "../models/Hotel";
import Room from "../models/Room";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      res.status(404).json({ message: `No hotel exists with id: ${hotelId}` });
      return;
    }

    hotel.rooms.push(savedRoom._id);
    await hotel.save();

    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const room = await Room.findById(id);

    if (!room) {
      res.status(404).json({ message: `No room exists with id: ${id}` });
      return;
    }

    room.set(req.body);
    const updatedRoom = await room.save();

    res.status(201).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelid;
  const id = req.params.id;

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      res.status(404).json({ message: `No room exists with id: ${id}` });
      return;
    }

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      res.status(404).json({ message: `No hotel exists with id: ${hotelId}` });
      return;
    }

    hotel.rooms.pull(id);
    await hotel.save();

    res.status(200).json({ message: "Room has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const room = await Room.findById(id);

    if (!room) {
      res.status(404).json({ message: `No room exists with id: ${id}` });
      return;
    }

    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
