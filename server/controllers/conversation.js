import Conversation from "../models/conversationModel.js";
import Users from "../models/userModel.js";
import Message from "../models/messageModel.js";
import fs from "fs";
import path,{dirname} from "path";
import { fileURLToPath } from 'url'


   const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//new con
export const addConver = async (req, res) => {
    const { receiverId } = req.body;
    if ( !receiverId) {
        return res.status(400).json({ msg: "Receiver id is required!" });
    }
    const newConver = new Conversation({
        members: [req.userId, receiverId]
    });
    try {
        const saveConversation = await newConver.save();
        return res.status(201).json(saveConversation);
    } catch (err) {
        return res.status(500).json(err);
    }
}


//get conversations
export const getConver = async (req, res) => {
    //const { userId } = req.params;

    try {
        const userConversation = await Conversation.find({ members: { $in: [req.userId] } }).sort({ updatedAt: -1 });
        let find_msg = [];
        for (let i = 0; i < userConversation.length; i++){
            const msg = await Message.findOne({ conversationId: userConversation[i]._id }).sort({ updatedAt: -1 });
            find_msg.push(msg)
        }
        
        return res.status(200).json({conversations:userConversation,msg:find_msg});
    } catch (err) {
        return res.status(500).json(err);
    }
}

//get latest message 

//check exist conversation
export const checkConver = async (req, res) => {
    
    const {  receiver } = req.body;
    
    if ( !receiver) {
        return res.status(400).json({ msg: "Receiver Id is required!" });
    };
    try {
        
        const existConver = await Conversation.find({ $or: [{ members:{$eq: [req.userId, receiver] }}, { members: {$eq:[receiver, req.userId]} }]} 
);
    
        if (existConver) {
             return res.status(200).json(existConver);
        } else {
            return res.status(404)
         }
        
    } catch (err) {
        
        return res.status(500).json(err);
    }
}

//block user in conversation
export const blockConver = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const blockConversation = await Conversation.findByIdAndUpdate(conversationId, { block: { userId: req.userId },status:"block" });
        return res.status(201).json(blockConversation);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//delete Conversation
export const deleteConver = async (req, res) => {
 
    const { conversationId } = req.params;
    if (!conversationId) {
        return res.status(400).json({message:"Your current params conversationId is required!"})
    }
    try {
        const deleteCon = await Conversation.findByIdAndDelete(conversationId);
        const messages = await Message.find({ conversationId: deleteCon._id });
        for (let i = 0; i < messages.length; i++){
            if (messages[i].file.image) {
               fs.unlinkSync(path.join(__dirname,`../public/images/messages/${messages[i].file.image}`))
            }
            if (messages[i].file.video) {
               fs.unlinkSync(path.join(__dirname,`../public/video/messages/${messages[i].file.video}`))
           }
        }
        await Message.deleteMany({ conversationId:conversationId });  
        
        return res.status(200).json(deleteCon);
    } catch (err) {
        return res.status(500).json(err);
    }
}