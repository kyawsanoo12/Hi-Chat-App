import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import homeRoutes from "./routes/index.js";
import bodyParser from "body-parser";
import multer from "multer";
import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import Socket from "./socket.js";
import { createServer } from "http";
import { auth } from "./middleware/index.js";
import UserRoutes from "./routes/user.js";

const app = express();
const upload = multer();
const httpServer = createServer(app);
//socket
Socket(httpServer);

app.use(cors({
    origin:"http://localhost:3000"
}));

dotenv.config();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json({limit:"100mb"}));
app.use(express.static("public"))

app.use("/api", homeRoutes);
app.use("/api/users",auth,UserRoutes)
app.use("/api/conversations",auth, conversationRoutes);
app.use("/api/messages",auth,messageRoutes);



mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
    console.log("Server is running on Port : " + PORT);
})
}).catch((err) => {
    console.log(err);
})

