
import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import foodRoute from "./src/router/food.route.js"
import orderRoute from "./src/router/order.route.js"
import cors from "cors"
import AuthRouter from "./src/router/auth.route.js"
import cookieParser from "cookie-parser";
// import path from "path"

dotenv.config()

const app=express()

await connectDB()
const PORT=process.env.PORT || 5721
// const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())

// if(process.env.NODE_ENV !== "production"){
    app.use(
        cors({
          origin: `${process.env.BASE_FRONTEND_URL}` || "http://localhost:8080",
          credentials: true,
        })
    );
// }

app.use("/api/auth" , AuthRouter)
app.use("/api/food" , foodRoute)
app.use("/api/order" , orderRoute)


// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname , "/frontend/dist")))

//     app.get("*" , (req,res) => {
//         res.sendFile(path.resolve(__dirname , "frontend", "dist", "index.html"))
//     }
//     )
// }

app.listen(PORT , () => {
    console.log(`My Hotel Menu Link http://localhost:${PORT}`)
})