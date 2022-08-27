import { NextFunction, Request, Response } from "express";
import Lodging from "../models/Lodging";
import Room from "../models/Room";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const lodgingId = req.query.lodgingid;
  const newRoom = new Room(req.body);
  console.log("LodgingID:", lodgingId);

  try {
    const savedRoom = await newRoom.save();

    if (lodgingId) {
      const lodging = await Lodging.findById(lodgingId);

      if (!lodging) {
        res.status(404).json({ message: `No lodging exists with id: ${lodgingId}` });
        return;
      }

      lodging.rooms.push(savedRoom._id);
      await lodging.save();
    }

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

export const updateRoomAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await Room.updateOne(
      { "roomNumbers._id": id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );

    res.status(200).json("Room status has been updated");
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  const lodgingId = req.query.lodgingid;
  const id = req.params.id;

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      res.status(404).json({ message: `No room exists with id: ${id}` });
      return;
    }

    if (lodgingId) {
      const lodging = await Lodging.findById(lodgingId);

      if (!lodging) {
        res.status(404).json({ message: `No lodging exists with id: ${lodgingId}` });
        return;
      }

      lodging.rooms.pull(id);
      await lodging.save();
    }

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
