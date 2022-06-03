import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
        }
    ],
   status:{type:String,default:"active"},
    block: {
        userId:{type:String,default:null},
    }
    
}, { timestamps: true });

export default mongoose.model("conversation", conversationSchema);