
import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema(
  {
    OrderId: {type: Number, required:true},
    Foods: [],
    OrderType: {
      type: String,
      required: true,
      enum: ["chair", "room"], // only these two allowed
    },
    OrderNumber: {
      type: Number, // can change to String if needed
      required: true,
    },
    OrderStatus: {
      type: String, 
      required: true,
    }
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Order", OrderSchema);
