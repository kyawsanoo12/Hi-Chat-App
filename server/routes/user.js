import express from "express";
import { getFriends } from "../controllers/user.js";

const router = express.Router();

router.get("/getfriends", getFriends);

export default router;