import express from "express";
import {addEmoji, addMessage,deleteMessage,getMessage } from "../controllers/messageController.js";
const router = express.Router();

import multer from "multer";
import path,{dirname} from "path";
import { fileURLToPath } from 'url'
import { auth } from "../middleware/index.js";


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const savePhotoFilePath = path.join(__dirname, "../public/images/messages");
const saveVideoFilePathForMsg = path.join(__dirname, "../public/video/messages");
const typeofPhoto = ["image/jpg", "image/jpeg", "image/png","image/gif"];
const typeofVideo = ['video/mp4'];

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            
            if (typeofPhoto.includes(file.mimetype)) {
                cb(null, savePhotoFilePath)
            } else if (typeofVideo.includes(file.mimetype)) {
                cb(null,saveVideoFilePathForMsg)
            }
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + Math.random() * 1E9;
            cb(null, uniqueName + file.originalname);
        },

    })

     const upload = multer({
        storage: storage, fileFilter: (req, file, cb) => {
           
            if (typeofPhoto.includes(file.mimetype)) {
                cb(null, true)
            } else if(typeofVideo.includes(file.mimetype)) {
               
                cb(null, true)
            } else {
                cb(null,false)
            };
        }
    });


router.post("/",upload.single("file") ,addMessage);
router.get("/:conversationId/", getMessage);
router.delete("/:messageId", deleteMessage);
router.patch("/", addEmoji);

export default router;