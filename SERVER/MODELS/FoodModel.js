import mongoose from "mongoose";
const foodschema=new Schema({
    foodname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    }
});

export const Food=mongoose.model("Food",foodschema);