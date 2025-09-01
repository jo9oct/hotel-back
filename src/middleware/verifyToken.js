
import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) => {

    try{
        let token;

        if (req.cookies && req.cookies.token) {
          token = req.cookies.token;
        }
    

        if(!token){
            return res.status(401).json({
                success:false,
                massage: "unauthorized - no token provided"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                success:false,
                massage: "unauthorized - invalid token"
            })
        }
        req.userId=decoded.userID
        next()
    }
    catch(error){
        console.log("Error in verify token",error)
        res.status(500).json({
            success:false,
            massage: "server error"
        })
    }

}