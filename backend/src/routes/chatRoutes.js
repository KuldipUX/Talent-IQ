import express from "express"
import { getStreamToken } from "../controller.js/chatController.js"
import { protectRoute } from "../middleware/protectRoute.js"
const router = express.Router()

router.get('/token',protectRoute,getStreamToken)

export default router