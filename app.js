
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import foodRoute from "./src/router/food.route.js"
import orderRoute from "./src/router/order.route.js"
import cors from "cors"
import AuthRouter from "./src/router/auth.route.js"
import cookieParser from "cookie-parser";

dotenv.config()

const app=express()

await connectDB()
const PORT=process.env.PORT || 5721

app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
        origin: "https://hotel-menu-32.onrender.com",
        credentials: true,
    })
);

app.use("/api/auth" , AuthRouter)
app.use("/api/food" , foodRoute)
app.use("/api/order" , orderRoute)


app.listen(PORT , () => {
    console.log(`My Hotel Menu Link http://localhost:${PORT}`)
})
