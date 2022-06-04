import Message from "../models/messageModel.js";
import fs from "fs";
import path,{dirname} from "path";
import { fileURLToPath } from 'url'
import Conversation from "../models/conversationModel.js";



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//add message
export const addMessage = async (req, res) => {
    const { conversationId,  text,receiver,to,replyText,replyImage } = req.body;
    try {
        const existConversation = await Conversation.findById(conversationId);
        if (existConversation) {
            const typeofPhoto = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
            let newMessage;
          
            if (req.file) {
              
                newMessage = new Message({
                    conversationId,
                    sender:req.userId,
                    text: null,
                    file: {
                        image: typeofPhoto.includes(req?.file?.mimetype) ? req.file?.filename : null,
                        video: req?.file?.mimetype == "video/mp4" ? req.file?.filename : null,
                   
                    }
                
                });
            } else {
                
               newMessage = new Message({
                    conversationId,
                    sender:req.userId,
                    text,
                   reply: to ? { to: to, text:replyText,image:replyImage} : null
                })
            }
           
           
            const saveMessage = await newMessage.save(); 
            const conver = await Conversation.findByIdAndUpdate(existConversation._id, { updatedAt: new Date() });
            
            return res.status(201).json(saveMessage);
        } else {
            
          
          if (!receiver) {
                   return res.status(400).json({ msg: " Receiver Id  is required" });
            }
            const newConversation = await Conversation.create({
                members: [
                    req.userId,
                    receiver
                ]
            });
           
            const newMessage = await Message.create({ conversationId: newConversation._id, sender: req.userId, text });
            
            return res.status(201).json(newMessage);
        }
     
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

//get messages
export const getMessage = async (req, res) => {
    const { limit,sort } = req.query;
  
    const { conversationId } = req.params;
    if (!conversationId) {
        return res.status(400).json({ msg: "Conversation params id is required!" });
    }

    try {
        const message = await Message.find({ conversationId: conversationId }).limit(limit || 0).sort(sort);
        return res.status(200).json(message);
    } catch (err) {
        return res.status(500).json(err);
    }
};


//set Emoji in message
export const addEmoji = async (req, res) => { 
    const { messageId, emoji } = req.body;
 
    if (!messageId) {
        return res.status(400).json({ msg: "Message id is required!" });
    }
    if (!emoji) {
        return res.status(400).json({ msg: "Emoji is required!" });
    }
    try {
        const existMessageReact = await Message.find({_id:messageId});
     
            const message = await Message.findByIdAndUpdate(messageId, {
                react: {
                    responseId:existMessageReact[0].react.responseId === req.userId && existMessageReact[0].sender !== req.userId? null: req.userId,
                    emoji:existMessageReact[0].react.responseId === req.userId  && existMessageReact[0].sender !== req.userId? null:emoji
                }
            });
            return res.status(201).json(message);
    } catch (err) {
        return res.status(500).json(err);
    }
};




//delete message
export const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        
      
        const message = await Message.findByIdAndUpdate(messageId, { text: "removed message", status: "removed" });
        const successMsg = await Message.findById(messageId);
        if (successMsg.file.image) {
         fs.unlinkSync(path.join(__dirname, "../public/images/messages/" + successMsg.file.image));
             await Message.findByIdAndUpdate(messageId, { file:{image:null,video:null,audio:null} });
       
        } else if (successMsg.file.video) {
           fs.unlinkSync(path.join(__dirname, "../public/video/messages/" + successMsg.file.video));
            
            await Message.findByIdAndUpdate(messageId, { file: null });
      
          }
        return res.status(201).json(successMsg);
    } catch (err) {
        return res.status(500).json(err);
    }
}



