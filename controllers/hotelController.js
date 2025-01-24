import {Hotel} from "../models/hotelModel.js"
import {User} from "../models/UserModel.js"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
export const hotelCreation=async(req,res,next)=>{
    try{
        const{hotelname,address,phone,gstno,licenseno}=req.body;
        if (!hotelname || !address || !phone || !gstno || !licenseno){
            return res.status(400).json({message:"all fields are required"});
        }
        const isHotelExist=await Hotel.findOne({licenseno})

        if(isHotelExist){
            return res.status(400).json({message:"Restaurant already registered"})
        }

        const hotelData=new Hotel({hotelname,address,phone,gstno,licenseno})
        await hotelData.save();
        return res.json({data:hotelData,message:"Restaurant registered successfully"})
    }catch(error){
        return res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
    }
};
export const hotelOwnerLogin=async(req,res,next)=>{
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
export const hotelEdit = async (req, res, next) => {
    console.log("req.hotel:", req.hotel);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);

    try {
        const hotelid = req.hotel?.id || req.params.hotelId || req.body.hotelId;
        if (!hotelid) {
            return res.status(400).json({ message: "Hotel ID is required" });
        }

        const { hotelname, address, phone, gstno, licenseno } = req.body;

        if (!hotelname && !address && !phone && !gstno && !licenseno) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        const hotel = await Hotel.findById(hotelid);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        if (hotelname) hotel.name = hotelname;
        if (address) hotel.address = address;
        if (phone) hotel.phone = phone;
        if (gstno) hotel.gstno = gstno;
        if (licenseno) hotel.licenseno = licenseno;

        const updatedHotel = await hotel.save();
        return res.json({ data: updatedHotel, message: "Hotel details updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getHotelDetails = async (req, res, next) => {
    try {
        const { hotelid } = req.params; // Extract hotel ID from the request parameters

        if (hotelid) {
            // Fetch details of a specific hotel
            const hotel = await Hotel.findById(hotelid);
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }
            return res.json({ data: hotel, message: "Hotel details fetched successfully" });
        } else {
            // Fetch all hotels if no ID is provided
            const hotels = await Hotel.find();
            return res.json({ data: hotels, message: "All hotel details fetched successfully" });
        }
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
