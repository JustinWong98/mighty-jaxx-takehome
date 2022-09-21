import mongoose from "mongoose";

export interface productInterface {
  sku: Number;
  title: String;
  image: String;
}

const productSchema = new mongoose.Schema<productInterface>({
  sku: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});

export const Product = mongoose.model<productInterface>(
  "Products",
  productSchema
);
