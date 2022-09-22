import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";

const app = express();

// 100mb limit for higher definition images
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

const CONNECTION_STRING: string = process.env.CONNECTION_STRING as string;
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

mongoose
  .connect(CONNECTION_STRING)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
