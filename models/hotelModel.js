import mongoose from "mongoose";
const { Schema } = mongoose;
const hotelSchema=new Schema({
    hotelname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true  //ithu ellathe oru user ne create cheyyan pattilla
    },
    gstno:{
        type:String,
        required:true
    },
    licenseno:{
        type:String,
        required:true
    }
});

export const Hotel=mongoose.model("Hotel",hotelSchema);