import express from "express";

import { getHistory, SubmitTitle } from "../controllers/title.controllers.js";
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

console.log("we are in the route")
router.post("/submit", protectRoute, SubmitTitle);
router.get("/history", protectRoute, getHistory);


export default router;
