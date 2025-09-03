
import {Admins} from "../model/admin.model.js"
import bcrypt from "bcryptjs"
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js"

export const checkAuth =  async (req,res) => {

    try{
        const user=await Admins.findById(req.userId)

        if(!user){
            return res.status(400).json({
                success:false,
                massage:"admin not found"
            })
        }

        res.status(200).json({
            success:true,
            massage: "Success",
            user
        })
    }
    catch(error){
        console.log("error in check auth" , error)
        res.status(500).json({
            success:false,
            massage:"server error"
        })
    }
}

export const Signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new Admins({
      username,
      password: hashPassword,
    });

    await user.save();

    // Generate JWT and set cookie
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      Admin: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const Login= async (req,res) =>{
   
    const {username,password} = req.body

    try{
        const user=await Admins.findOne({username})

        if(!user){
            return res.status(400).json({
                success:false,
                massage: "Username not found"
            })
        }

        const isPassword=await bcrypt.compare(password,user.password)

        if(!isPassword){
            return res.status(400).json({
                success:false,
                massage: "Password is not correct"
            })
        }

        generateTokenAndSetCookie(res,user._id)

        user.lastLogin = Date.now()

        await user.save()

        res.status(200).json({
            success:true,
            massage:"Login successfully",
            user:{
                ...user._doc,
                password: undefined
            }
        })

    }
    catch(error){
        console.log("login error" , error)
        res.status(500).json({
            success:false,
            massage:"server error"
        })
    }
}

export const Logout= async (req,res) =>{

    try{
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "none", // must match how it was set
        });
        res.status(200).json({
            success:true,
            massage: "Log Out Successfully"
        })
    }
    catch(error){
        console.log("error" , error)
        res.status(500).json({
            success:true,
            massage: "Server error"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
      const userId = req.userId; // <-- use req.userId
  
      const { currentPassword, newPassword } = req.body;
  
      const user = await Admins.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      let isUpdated = false;
  
      // Update password
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ message: "Current password is required" });
        }
  
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }
  
        user.password = await bcrypt.hash(newPassword, 10);
        isUpdated = true;
      }
  
      if (!isUpdated) {
        return res.status(400).json({ message: "No changes detected" });
      }
  
      await user.save();
      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
