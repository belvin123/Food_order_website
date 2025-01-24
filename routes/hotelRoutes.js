import e from "express";
import { getHotelDetails, hotelCreation, hotelEdit} from "../controllers/hotelController.js";
import { attachHotel } from "../middlewares/hotelAuth.js";
const router=e.Router()

router.post("/hotel_creation",hotelCreation)
router.put("/hotel_edit",attachHotel,hotelEdit)
router.get("/hotel_details",getHotelDetails)
export {router as hotelRouter}