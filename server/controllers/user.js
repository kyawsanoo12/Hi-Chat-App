import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path,{dirname} from "path";
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const Login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
          return res.status(400).json({msg: "Your information is not enought"});
    };
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const confirmPwd = await bcrypt.compare(password, existingUser.password);
            if (confirmPwd) {
                const user = {
                    email: existingUser.email,
                    name: existingUser.name,
                    image: existingUser.image,
                    _id:existingUser._id,
                }
                const token = jwt.sign(user, process.env.secret, { expiresIn: "30d" });

                return res.status(200).json({ result: user, token: token });
            } else {
                return res.status(404).json({ msg: "Password Incorrect!" });
            }
        } else {
            return res.status(404).json({ msg: "User haven't account.Please register" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const Register = async (req, res) => {
    const { firstName, lastName, email, password, image,confirmPassword,country,region } = req.body;
    let error = [];
    if (!firstName || !lastName || !email || !password || !confirmPassword || !country || !region) {
         error.push({msg: "Your information is not enought"});
    };
   
     if (password.lenght  < 8 ) {
     error.push({ msg: "Password have latest 8 charactor" });
    }
    
    if (password !== confirmPassword) {
     error.push({ msg: "Password doesn't match!" });
    }

    try {
        if (error.length > 0) {
            const filepath = path.join(__dirname, "../public/images/user/")
            fs.unlinkSync(filepath + req.file.filename);
            console.log(error)
            return res.status(400).json(error)
        } else {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                const filepath = path.join(__dirname, "../public/images/user/")
            fs.unlinkSync(filepath + req.file.filename);
                return res.status(400).json({ msg: "User have already account! Please try again." });
            } else {
                const hashPwd = await bcrypt.hash(password, 10);
                const newUser = new User({
                    email: email,
                    name: `${firstName} ${lastName}`,
                    image: req.file.filename,
                    address:`${region}, ${country}`,
                    password: hashPwd
                });

                const user = await newUser.save();

                return res.status(201).json(user);
            }
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//get friends
export const getFriends = async (req, res) => {
    try {
        const friends = await User.find({ _id: { $ne: req.userId } });
        //console.log(req.userId);
        return res.status(200).json(friends);
    } catch (err) {
        return res.status(500).json(err);
    }
}