import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import Hotel from "../models/Hotel";

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      res.status(404).json({ message: `No hotel exists with id: ${id}` });
      return;
    }

    hotel.set(req.body);
    const updatedHotel = await hotel.save();

    res.status(201).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      res.status(404).json({ message: `No hotel exists with id: ${id}` });
      return;
    }

    res.status(200).json({ message: "Hotel has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      res.status(404).json({ message: `No hotel exists with id: ${id}` });
      return;
    }

    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 99999 } }).limit(
      Number(limit)
    );
    res.status(200).json(hotels);
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
        return Hotel.countDocuments({ city_lower: city.toLowerCase() });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
  const propertyTypes = ["hotel", "apartment", "resort", "villa", "cabin"];

  try {
    const list = await Promise.all(
      propertyTypes.map(async (type) => {
        return { type: type + "s", count: await Hotel.countDocuments({ type: type }) };
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
