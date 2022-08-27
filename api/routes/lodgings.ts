import express from "express";
import {
  countByCity,
  countByType,
  createLodging,
  deleteLodging,
  getLodging,
  getLodgingRooms,
  getLodgings,
  updateLodging
} from "../controllers/lodgingController";
import { verifyAdmin } from "../utils/verifyToken";

const router = express.Router();

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/:id", getLodging);
router.get("/", getLodgings);
router.get("/room/:id", getLodgingRooms);
router.post("/", verifyAdmin, createLodging);
router.put("/:id", verifyAdmin, updateLodging);
router.delete("/:id", verifyAdmin, deleteLodging);

export default router;
