import {Food} from "../models/FoodModel.js"

export const getFoods=async(req,res,next)=>{
    try{
        const foodList=await Food.find().select("-desc");
        res.json({data:foodList,message:"Foodlist fetched"})
    }catch(error){
        return res.status(error.statuscode || 500).json({message:error.message || "Internal server error"});
    }
};
export const getFoodDetails=async(req,res,next)=>{
    try{
        const foodDetails=await Food.find().populate("Hotel");
        res.json({data:foodDetails,message:"Foodlist fetched"})
    }catch(error){
        return res.status(error.statuscode || 500).json({message:error.message || "Internal server error"});
    }
};
export const createFood=async(req,res,next)=>{
    try{
        const {foodname,price,desc}=req.body;
        if (!foodname || !price){
            return res.status(400).json({message:"All fields are required"});
        }
        console.log("image===",req.file);
        const foodData=new Food({foodname,price,desc,image})
        await foodData.save();
        
        res.json({data:foodData,message:"New menu added"})
    }catch(error){
        return res.status(error.statuscode || 500).json({message:error.message || "Internal server error"});
    }
};