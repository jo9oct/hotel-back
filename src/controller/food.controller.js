
import mongoose from "mongoose"
import {Foods} from "../model/food.js"

export const GetFoods = async (req,res) => {
    
    try{
        const Food=await Foods.find({}).sort({createdAt:-1})
        res.status(200).json(Food)
    }catch(error){
        console.error("Error in fetching Food" , error.message)
        res.status(404).json({
            success: false,
            message: "Food Not Found",
        });
    }

}

export const AddFood= async (req, res) => {
    const FoodData = req.body;

    if (!FoodData.FoodName || !FoodData.Price || !FoodData.Description || !FoodData.ImageURL || !FoodData.Category ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    try {
      
      const newFood = new Foods(FoodData);
      await newFood.save();
  
      res.status(201).json({
        success: true,
        message: newFood,
      });

    } catch (error) {
      console.error("Error in creating Food:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

export const UpdateFood= async (req,res) =>{
    const id=req.params.id;
    const Food=req.body;

   console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Invalid Food ID"})
        return
    }

    try{
        const updateData=await Foods.findByIdAndUpdate(id,Food,{new:true})
        await updateData.save();
        res.status(200).json({
            success:true,
            data:updateData
        })
    }catch(error){
        console.error("Error in updating Food:", error.message);
        res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
}

export const DeleteFood= async (req,res) => {
    const id=req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({success:false,message:"Invalid Food ID"})
    }

    try{
        await Foods.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Food Deleted",
          });
    }
    catch(error){
        console.error("Error in deleting Food" , error.message)
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }

}
