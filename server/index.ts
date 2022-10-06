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
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://bucolic-cucurucho-bab150.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(
  cors({
    credentials: true,
    origin: "https://bucolic-cucurucho-bab150.netlify.app",
  })
);

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

mongoose
  .connect(process.env.CONNECTION_STRING as string)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
