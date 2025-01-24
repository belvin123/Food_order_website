import jwt from "jsonwebtoken";
import { Hotel } from "../models/hotelModel.js";

/*export const hotelAuth=(req,res,next)=>{
    try{
        const{token}=req.cookies;
        if(!token){
            return res.status(401).json({message:"user not autherised",success:false});
        }
        const tokenVerified=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if (!tokenVerified){
            return res.status(401).json({message:"user not autherised",success:false});
        }
        if(tokenVerified.usertype!="owner"){
            return res.status(401).json({message:"user not authorized",success:false});
        }
        req.user=tokenVerified;
        next();
    }catch(error){
        return res.status(401).json({message:error.message || "user autherisation failed",success:false});
    }
}*/

export const attachHotel = async (req, res, next) => {
    const { hotelId } = req.params; // or wherever the hotel ID comes from
    if (!hotelId) {
        return res.status(400).json({ message: "Hotel ID is required" });
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
    }
    req.hotel = hotel; // Attach hotel to the request
    next();
};
