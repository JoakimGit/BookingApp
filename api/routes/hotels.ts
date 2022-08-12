import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel
} from "../controllers/hotelController";
import { verifyAdmin } from "../utils/verifyToken";

const router = express.Router();

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/:id", getHotel);
router.get("/", getHotels);
router.get("/room/:id", getHotelRooms);
router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
