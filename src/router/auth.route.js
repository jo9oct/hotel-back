
import express from "express"
import {Signup,Login,Logout,checkAuth,updateProfile} from "../controller/auth.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router=express()

router.get("/checkAuth" , verifyToken , checkAuth)

router.post("/Signup" , Signup)

router.post("/Login" , Login)

router.post("/Logout" , Logout)

router.put("/update-profile" , verifyToken , updateProfile)

export default router
