import { Request, Response } from "express";

import { adminInterface, Admin } from "../models/adminModel";

export const login = async (req: Request, res: Response) => {
  try {
    // to use req.body to findOne
    const admin: adminInterface[] = await Admin.find();
    // to add logic for finding one with the username
    // to add rejection if no username
    // to add logic to find if hashed password is correct
    // to add rejection if wrong password
    res.status(200).json(admin);
  } catch (err) {
    res.status(404).json(`Error: ${err}`);
  }
};

export const signup = async (req: Request, res: Response) => {
  const adminForm = req.body;

  const newAdmin = new Admin(adminForm);
  try {
    // see if username exists, reject if so
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};
