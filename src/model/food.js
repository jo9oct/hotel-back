
import mongoose from "mongoose";

const FoodSchema=new mongoose.Schema({
    FoodName:{type:String,required:true},
    Price:{type:Number,required:true},
    Description:{type:String,required:true},
    ImageURL:{type:String,required:true},
    Category:{type:String,required:true},
},{timestamps:true});

export const Foods=mongoose.model("Food" , FoodSchema);
