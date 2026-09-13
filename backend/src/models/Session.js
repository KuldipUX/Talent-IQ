import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    problem:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    participant: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    status:{
        type:String,
        enum:["active","completed","expired","closed"],
        default:"active"
    },
    startedAt: {
        type: Date,
        default: Date.now,
    },
    endedAt: {
        type: Date,
        default: null,
    },
    //stream video call ID
    callId:{
        type:String,
        default:""  ,
    }
}, { timestamps: true });

const Session = mongoose.model("Session",sessionSchema);

export default Session