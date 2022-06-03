import express from "express";
import { fetchAllUsers, Login, Register } from "../controllers/user.js";
import multer from "multer";
import path,{dirname} from "path";
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const saveFilePath = path.join(__dirname, "../public/images/user");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,saveFilePath)
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.random() * 1E9;
        cb(null, uniqueName + file.originalname);
    },

})

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        const typeofFile = ["image/jpg", "image/jpeg", "image/png"];
        if (typeofFile.includes(file.mimetype)) {
            cb(null,true)
        } else {
            cb(null,false)
        };
}});

const router = express.Router();



router.post("/login",Login);
router.post("/register",upload.single("image"),Register);
router.get("/users", fetchAllUsers);

export default router;