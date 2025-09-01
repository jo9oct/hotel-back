
import express from "express";
import {AddOrders,ChangeOrderStatus,UpdateOrder,DeleteOrders,GetOrders} from "../controller/order.controller.js"

const route=express()

route.get("/" , GetOrders)
route.post("/" , AddOrders)
route.patch("/:id" , ChangeOrderStatus)
route.put("/:id" , UpdateOrder)
route.delete("/:id" , DeleteOrders)


export default route
