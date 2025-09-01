
import express from "express";
import {AddFood,UpdateFood,DeleteFood,GetFoods} from "../controller/food.controller.js"

const route=express()

route.get("/" , GetFoods)
route.post("/" , AddFood)
route.put("/:id" , UpdateFood)
route.delete("/:id" , DeleteFood)


export default route