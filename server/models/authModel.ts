import mongoose from "mongoose";

export interface adminInterface {
  email: string;
  hashedPassword: string;
}

const adminSchema = new mongoose.Schema<adminInterface>({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
});

export const Admin = mongoose.model<adminInterface>("Admin", adminSchema);
