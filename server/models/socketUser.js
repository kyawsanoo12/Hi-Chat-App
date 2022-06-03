import mongoose from "mongoose";


const Schema = new mongoose.Schema({
    userId: { type: String },
    socketId:{type:String}
})

export default mongoose.model("socketUsers", Schema);