import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { adminInterface, Admin } from "../models/authModel";

export const login = async (req: Request, res: Response) => {
  // extract fields from req.body
  const { email, password } = req.body;
  try {
    // Find admin with email
    const existingAdmin = await Admin.findOne({
      email,
    });
    // rejection if no email
    if (!existingAdmin) {
      return res.status(404).json({ message: "email does not exist." });
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
    // to change SALT - keep it secure!
    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id },
      "test",
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ result: existingAdmin, token });
  } catch (err) {
    res.status(500).json(`Error: ${err}`);
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  console.log({ email, password, confirmPassword });
  try {
    // see if email domain exists already, reject if so
    const existingAdminEmail = await Admin.findOne({
      email,
    });
    console.log("1");
    if (existingAdminEmail) {
      return res.status(400).json({ message: "Email already registered!" });
    }
    console.log("2");
    // double check if passwords are the same
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match! (You shouldn't be seeing this!)",
      });
    }
    console.log("3");
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, hashedPassword });
    await newAdmin.save();
    console.log("4");
    // to change SALT - keep it secure!
    const token = jwt.sign({ email: newAdmin.email, id: newAdmin.id }, "test", {
      expiresIn: "24h",
    });
    console.log("5");
    res.status(201).json({ result: newAdmin, token });
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};
