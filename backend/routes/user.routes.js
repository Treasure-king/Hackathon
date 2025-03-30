import express from "express";
import User from "../models/User.models.js";
import protectRoute from "../middlewares/protectRoute.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";


const router = express.Router();

// **GET Profile (Protected)**
router.get("/profile", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// **UPDATE Profile (Protected)**
router.put("/profile", protectRoute, async (req, res) => {
  try {
    const { fullName, email, bio, profilePic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, email, bio, profilePic },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
});
export default router;
