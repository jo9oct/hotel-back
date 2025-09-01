
import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
},{timestamps:true})

export const Admins=mongoose.model("admin", adminSchema)
