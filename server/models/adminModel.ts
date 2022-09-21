import mongoose from "mongoose";

export interface adminInterface {
  id: Number;
  username: String;
  hashedPassword: String;
}

const adminSchema = new mongoose.Schema<adminInterface>({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
});

export const Admin = mongoose.model<adminInterface>("Admin", adminSchema);
