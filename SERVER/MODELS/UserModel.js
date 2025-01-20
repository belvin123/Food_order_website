import mongoose from "mongoose";
const { Schema } = mongoose;
const userschema=new Schema({
    password:{
        type:String,
        required:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,  //ithu ellathe oru user ne create cheyyan pattilla
        unique:true  //email repeat akan padilla so unique koduthu
    },
    usertype:{
        type:String,
        required:true,
        enum:["customer","owner"],    //ee randu values mathram edukkullu
        default:"customer"
    },
    profilepic:{
        type:String,
        default:"https://www.google.com/imgres?q=profilepic%20placeholder&imgurl=https%3A%2F%2Fst3.depositphotos.com%2F6672868%2F13701%2Fv%2F450%2Fdepositphotos_137014128-stock-illustration-user-profile-icon.jpg&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fvectors%2Fplaceholder.html&docid=AXyB62LEmaF68M&tbnid=NuPwJSFUCF_uzM&vet=12ahUKEwiRovfyiYGLAxXIp1YBHVrCOKYQM3oECBwQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwiRovfyiYGLAxXIp1YBHVrCOKYQM3oECBwQAA"
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    isactive:{
        type:Boolean,
        default:true
    }
});

export const User=mongoose.model("user",userschema);


