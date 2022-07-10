import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";
import { verifyAdmin, verifyUser } from "../utils/verifyToken";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);

export default router;
