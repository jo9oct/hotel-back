
import JWT from "jsonwebtoken"

export const generateTokenAndSetCookie= (res,userID) =>{
    const token=JWT.sign({userID} , process.env.JWT_SECRET , {
        expiresIn:"7d",
    })
 console.log("token" , token)
    res.cookie("token" , token , {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
}
