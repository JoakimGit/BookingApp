import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import Lodging from "../models/Lodging";
import Room from "../models/Room";

export const createLodging = async (req: Request, res: Response, next: NextFunction) => {
  const newLodging = new Lodging(req.body);

  try {
    const savedLodging = await newLodging.save();
    res.status(200).json(savedLodging);
  } catch (error) {
    next(error);
  }
};

export const updateLodging = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const lodging = await Lodging.findById(id);

    if (!lodging) {
      res.status(404).json({ message: `No lodging exists with id: ${id}` });
      return;
    }

    lodging.set(req.body);
    const updatedLodging = await lodging.save();

    res.status(201).json(updatedLodging);
  } catch (error) {
    next(error);
  }
};

export const deleteLodging = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const deletedLodging = await Lodging.findByIdAndDelete(id);

    if (!deletedLodging) {
      res.status(404).json({ message: `No lodging exists with id: ${id}` });
      return;
    }

    res.status(200).json({ message: "Lodging has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const getLodging = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const lodging = await Lodging.findById(id);

    if (!lodging) {
      res.status(404).json({ message: `No lodging exists with id: ${id}` });
      return;
    }

    res.status(200).json(lodging);
  } catch (error) {
    next(error);
  }
};

export const getLodgings = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, min, max, city, ...others } = req.query;

  try {
    const lodgings = await Lodging.find({
      ...others,
      ...(city ? { city_lower: (city as string)?.toLowerCase() } : {}),
      cheapestPrice: { $gt: min || 1, $lt: max || 99999 }
    }).limit(Number(limit));
    res.status(200).json(lodgings);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
  let cities: string[] | null = null;

  if (typeof req.query.cities === "string") {
    cities = req.query.cities.split(",");
  }

  try {
    if (!cities) {
      return res.status(400).json({ message: `Query params for cities must be a string` });
      // alt: { $regex: new RegExp("^" + city + "$", "i") }
    }

    const list = await Promise.all(
      cities.map((city) => {
        return Lodging.countDocuments({ city_lower: city.toLowerCase() });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
  const propertyTypes = ["hotel", "apartment", "resort", "villa", "inn"];

  try {
    const list = await Promise.all(
      propertyTypes.map(async (type) => {
        return {
          type: type + "s",
          count: await Lodging.countDocuments({ type: { $regex: new RegExp("^" + type + "$", "i") } })
        };
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getLodgingRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lodging = await Lodging.findById(req.params.id);
    if (!lodging || !lodging.rooms) {
      return res.status(200).json([]);
    }
    const rooms = await Promise.all(lodging.rooms.map((room) => Room.findById(room)));
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
