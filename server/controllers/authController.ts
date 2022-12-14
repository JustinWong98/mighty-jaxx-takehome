import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { Admin } from "../models/authModel";

export const login = async (req: Request, res: Response) => {
  // extract fields from req.body
  const { email, password } = req.body;
  const newEmail = email;
  try {
    // Find admin with email
    const existingAdmin = await Admin.findOne({
      email: newEmail,
    });
    // rejection if no email
    if (!existingAdmin) {
      return res.status(404).json({ message: "Email is not registered." });
    }
    // logic to find if hashed password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.hashedPassword
    );
    // rejection if wrong password
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password." });
    }
    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id },
      process.env.SALT as string,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ result: existingAdmin, token });
  } catch (err) {
    res.status(500).json(`Error: ${err}`);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  try {
    // see if email domain exists already, reject if so
    const existingAdminEmail = await Admin.findOne({
      email,
    });
    if (existingAdminEmail) {
      return res.status(400).json({ message: "Email already registered!" });
    }
    // double check if passwords are the same
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match! (You shouldn't be seeing this!)",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, hashedPassword });
    await newAdmin.save();
    const token = jwt.sign(
      { email: newAdmin.email, id: newAdmin.id },
      process.env.SALT as string,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.status(201).json({ result: newAdmin, token });
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};
