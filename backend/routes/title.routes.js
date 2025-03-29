import express from "express";

import { getAllTitles, getHistory, SubmitTitle, updateTitleStatus } from "../controllers/title.controllers.js";
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

console.log("we are in the route")
router.post("/submit", protectRoute, SubmitTitle);
router.get("/history", protectRoute, getHistory);
router.get("/all", protectRoute, getAllTitles); // Get all submitted titles
router.put("/update/:id", protectRoute, updateTitleStatus); 
router.get("/user-title/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const userTitle = await Title.findOne({ userId }).sort({ createdAt: -1 }); // Fetch latest title
  
      if (!userTitle) {
        return res.status(404).json({ error: "No titles found for the user" });
      }
  
      res.json({
        title: userTitle.title,
        similarityScore: userTitle.similarityScore,
        suggestedTitles: ["Alternative 1", "Alternative 2", "Alternative 3"], // Generate AI-based suggestions here
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching title data" });
    }
  });
  


export default router;
