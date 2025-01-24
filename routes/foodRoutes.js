import e from "express";
import { getFoods,getFoodDetails, createFood } from "../controllers/foodController.js";
//import { hotelAuth } from "../middlewares/hotelAuth.js";
import {upload} from "../middlewares/multer.js"
const router=e.Router()

router.get("/get_foods",getFoods)
router.post("/create_foods",upload.single("image"), createFood)
router.get("/food_details",getFoodDetails)
router.put("/update_foods")
router.delete("/delete_course")
export {router as foodRouter}