import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    text: {
        type: String,
        default:null
    },
    reply: {
        to: { type: String },
        text: { type: String },
        image: { type: String },
        video:{type:String}
    },
    react: {
        responseId: { type: String, default: null },
        emoji:{type:String,default:null}
    },
    status: {
        type: String,
      default:"active"  
    },
    seen:{type:Boolean,default:false},
    file: {
        image: { type: String, default: null },
        video: { type: String, default: null },
        audio:{type:String,default:null}
        }
    
    
}, { timestamps: true });

export default mongoose.model("message", messageSchema);