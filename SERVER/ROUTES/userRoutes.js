import e from "express";
import { userLogin,userLogout,userProfile, usersignup } from "../controllers/userControllers.js";
import { userAuth } from "../middlewares/userAuth.js";
const router=e.Router()

router.post('/signup',usersignup)
router.post('/login',userLogin)
router.get('/profile',userAuth,userProfile)
router.get('/logout',userAuth,userLogout);

export {router as userRouter}