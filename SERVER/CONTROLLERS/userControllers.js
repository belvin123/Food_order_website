import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
export const usersignup=async(req,res,next)=>{
    try{
        const{name,email,password,phone,address,profilepic}=req.body;
        if (!name || !email || !password || !phone || !address){
            return res.status(400).json({message:"all fields are required"});
        }
        const isUserExist=await User.findOne({email})

        if(isUserExist){
            return res.status(400).json({message:"User already exist"})
        }
        const hashedPassword = bcrypt.hashSync(password, 10);


        const userData=new User({name,email,password:hashedPassword,phone,address,profilepic})
        await userData.save();
        const token=generateToken(userData._id)
        res.cookie("token",token);
        return res.json({data:userData,message:"User account created"})
    }catch(error){
        return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
    }
};
export const userLogin=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        if (!email || !password){
            return res.status(400).json({message:"all fields are required"});
        }
        const UserExist=await User.findOne({email})

        if(!UserExist){
            return res.status(404).json({message:"User does not exist"})
        }
        const passwordMatch=bcrypt.compareSync(password,UserExist.password);
        if(!passwordMatch){
            return res.status(401).json({message:"user not authenticated" } );
        }
        const token=generateToken(UserExist._id)
        res.cookie("token",token);
        return res.json({data:UserExist,message:"User login success"})
    }catch(error){
        return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
    }
};

export const userProfile=async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const userData=await User.findById(userId).select("-password");//password remove cheyyan vendi anu ithu kodukkunnathu
        return res.json({data:userData,message:"User profile fetched"})
    }catch(error){
        return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
    }
};
export const userLogout=async(req,res,next)=>{
    try{
       res.clearCookie("token");
        return res.json({message:"User logout success"})
    }catch(error){
        return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
    }
};