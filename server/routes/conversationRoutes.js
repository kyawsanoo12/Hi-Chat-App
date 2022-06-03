import express from "express";
import { addConver, blockConver, checkConver, deleteConver, getConver } from "../controllers/conversation.js";
const router = express.Router();

router.post("/", addConver);
router.get("/", getConver);
router.delete("/:conversationId", deleteConver);
router.post("/check", checkConver);
router.post("/:conversationId", blockConver);


export default router;