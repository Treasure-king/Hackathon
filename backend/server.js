import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import titleRoutes from './routes/title.routes.js'
import connectTOMongoDB from "./db/ConnectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/titles", titleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{ 
    connectTOMongoDB();
    console.log(`the app is listening on port = ${PORT}`)
});
