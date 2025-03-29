import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (user, res) => {
    const payload = user.username === "admin" 
        ? { username: "admin", role: "admin" } 
        : { userId: user._id, role: "user" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        httpOnly: true,
        sameSite: "strict",
    });
};

export default generateTokenAndSetCookie;
