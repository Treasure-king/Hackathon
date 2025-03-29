import express from "express";

import { getHistory, SubmitTitle } from "../controllers/title.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post('/submit',protectRoute,SubmitTitle)
router.get('/history',protectRoute,getHistory)

export default router;
