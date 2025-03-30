import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import User from '../models/User.models.js';

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender, isAdmin } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePic = `https://api.dicebear.com/8.x/lorelei/svg?seed=${username}&gender=${gender}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic,
            isAdmin: isAdmin || false, // Default to false if not provided
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
            isAdmin: newUser.isAdmin, // Include admin status in response
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin, // Return admin status
        });

    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
