import jwt from 'jsonwebtoken'
export const generateToken=(id,usertype)=>{
    try{
        var token = jwt.sign({id:id,usertype:usertype || 'user' },process.env.JWT_SECRET_KEY);
        return token;
    }catch(error){
        console.log(error);
    }
};