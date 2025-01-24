import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
export const usersignup=async(req,res,next)=>{
    try{
        const{name,email,password,phone,address,profilepic,usertype}=req.body;
        if (!name || !email || !password || !phone || !address){
            return res.status(400).json({message:"all fields are required"});
        }
        const isUserExist=await User.findOne({email})

        if(isUserExist){
            return res.status(400).json({message:"User already exist"})
        }
        const hashedPassword = bcrypt.hashSync(password, 10);


        const userData=new User({name,email,password:hashedPassword,phone,address,profilepic,usertype})
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
        //front end ilekku password kodukkathirikkan vendi anu
        delete UserExist._doc.password;
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

export const userEdit = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const { name, phone, address, profilepic, password } = req.body;

        if (!name && !phone && !address && !profilepic && !password) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (profilepic) user.profilepic = profilepic;
        if (password) {
            user.password = bcrypt.hashSync(password, 10); // Hash new password
        }

        // Save updated user
        const updatedUser = await user.save();

        return res.json({ data: updatedUser, message: "User details updated successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
