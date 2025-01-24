import e from "express"
import { userRouter } from "./userRoutes.js"
import { foodRouter } from "./foodRoutes.js"
import {hotelRouter} from "./hotelRoutes.js"
const router=e.Router()
router.use('/user',userRouter)
router.use('/food',foodRouter)
router.use('/hotel',hotelRouter)
export {router as apiRouter}