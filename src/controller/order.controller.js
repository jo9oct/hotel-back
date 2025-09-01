

import mongoose from "mongoose"
import {Orders} from "../model/Order.js"

export const GetOrders = async (req,res) => {
    
    try{
        const Food=await Orders.find({}).sort({createdAt:-1})
        res.status(200).json(Food)
    }catch(error){
        console.error("Error in fetching Food" , error.message)
        res.status(404).json({
            success: false,
            message: "Food Not Found",
        });
    }

}

export const AddOrders= async (req, res) => {
    const FoodData = req.body;

    if (
      !Array.isArray(FoodData.Foods) ||   // Foods must be an array
      FoodData.Foods.length === 0 ||       // array should not be empty
      !FoodData.OrderType ||               // must have order type
      !FoodData.OrderNumber  ||            // must have order number
      !FoodData.OrderStatus ||             // must have order status
      !FoodData.OrderId                     // must have order id
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    try {
      
      const newFood = new Orders(FoodData);
      await newFood.save();
  
      res.status(201).json(newFood);

    } catch (error) {
      console.error("Error in creating Food:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

export const ChangeOrderStatus = async (req, res) => {
  const id = req.params.id;
  const { OrderStatus } = req.body; // only extract OrderStatus

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ 
      success: false, 
      message: "Invalid Order ID" 
    });
  }

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { $set: { OrderStatus } },  // update only OrderStatus
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedOrder
    });

  } catch (error) {
    console.error("Error in updating order:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const UpdateOrder = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body; // rename for clarity

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { ...updateData }, // spread the fields to update
      { new: true } // return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order Updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error in Updating Order", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const DeleteOrders= async (req,res) => {
    const id=req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).json({success:false,message:"Invalid Food ID"})
    }

    try{
        await Orders.findByIdAndDelete(id)
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
