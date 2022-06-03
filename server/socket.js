
import { Server } from "socket.io";
import SocketUser from "./models/socketUser.js";

//Socket.io

export default (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    });
    
   
    
    const addUser =async (userId,socketId) => {
        try {
           
            const existUser = await SocketUser.find({ userId: userId });
            
            if (existUser.length == 0) {
                const user = new SocketUser({ userId, socketId });
              await user.save();
            } else {
                
                await SocketUser.findByIdAndUpdate(existUser[0]._id, { socketId: socketId });

            }
        } catch (err) {
           return console.log(err);
       }
     }
    
    const removeUser =async (socketId) => {
        try {
          
            await SocketUser.deleteMany({ socketId: socketId });
                } catch (err) {
            return console.log(err);
        }
    }
    const getUser =async (userId) => {
        try {
            const user = await SocketUser.find({userId:userId});
            return user;
        } catch (err) {
            return console.log(err);
      }
    }
    // on Connection
    io.on("connection", (socket) => {
        console.log("user is connection")
      //add user
        socket.on("addUser",async (userId) => {
            addUser(userId, socket.id);
            //getusers
            try {
                const users = await SocketUser.find({});
                io.emit("getUsers", users); 
            } catch (err) {
                return console.log(err);
           }
           
        })
       
        //send Message
        socket.on("sendMessage", async ({ senderId, receiverId, text, file,conversationId,messageId,data}) => {
           
            const user = await getUser(receiverId);
            const senderUser = await getUser(senderId)
            if (senderUser.length > 0 && senderUser !== []) {
                
                io.to(senderUser[0]?.socketId).emit("sendMessageSuccess", {data});
                
            } 
            if (user.length > 0 && user !== []) {
                
                io.to(user[0]?.socketId).emit("getMessages", { conversationId,senderId, text, file,status: "active", receiverId });
                io.emit("sendSuccess");
                io.to(user[0]?.socketId).emit("messageAlert", { senderId, receiverId });
                
            } else  {
                return;
            }
        })
        socket.on("setEmoji", (data) => {
            io.emit("getEmoji", data);
        })
        socket.on("removeMessage", (data) => {
            io.emit("getRemoveMessage", data);
       })
        socket.on("typingMessage",async (data) => {
            const user = await getUser(data.receiverId);
            
            io.to(user[0]?.socketId).emit("typingMessageGet", data);
      })

      
         
        socket.on("disconnect",async () => {
           console.log("user is disconnected")
            removeUser(socket.id);
            try {
                  const users = await SocketUser.find({});
            io.emit("getUsers",users)
            } catch (err) {
                return console.log(err);
        }
           
        })
    })
}