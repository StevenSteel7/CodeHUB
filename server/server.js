import express from "express";
import dotenv from "dotenv";
import 'dotenv/config'
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import noteRoutes from "./routes/noteRoutes.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



connectDB();

/* app.use("/api/auth", authRoutes);*/
app.use("/api/notes", noteRoutes);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.white);
  });