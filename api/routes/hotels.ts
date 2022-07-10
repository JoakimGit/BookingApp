import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel
} from "../controllers/hotelController";
import { verifyAdmin } from "../utils/verifyToken";

const router = express.Router();

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/:id", getHotel);
router.get("/", getHotels);

export default router;
