import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";

const app = express();
app.use(cookieParser());

// 100mb limit for higher definition images
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

const CONNECTION_STRING: string =
  "mongodb+srv://user:user@dashboard.2a8bgzz.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

mongoose
  .connect(CONNECTION_STRING)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
