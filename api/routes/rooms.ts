import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from "../controllers/roomController";
import { verifyAdmin } from "../utils/verifyToken";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);

export default router;
