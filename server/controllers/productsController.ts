import { Request, Response } from "express";
import { s3Upload } from "../middleware/s3Service";
import { Product, productInterface } from "../models/productModel";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productList: productInterface[] = await Product.find();
    console.log("it worked!");
    res.status(200).json(productList);
  } catch (err) {
    res.status(404).json(`Error: ${err}`);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { SKU, title } = req.body;
  const newSKU = SKU;
  const newTitle = title;
  try {
    // query for identical SKU and reject if it exists
    const existingProductWithSKU = await Product.findOne({
      sku: newSKU,
    });
    if (existingProductWithSKU) {
      return res.status(400).json({
        message: "There already is a Product with the same SKU in the listing!",
      });
    }
    // query for existing identical Title and reject if it exists
    const existingProductWithTitle = await Product.findOne({
      title: newTitle,
    });
    if (existingProductWithTitle) {
      return res.status(400).json({
        message:
          "There already is a Product with the same title in the listing!",
      });
    }
    const result = await s3Upload(req.file!);
    const newProduct = new Product({
      sku: SKU,
      title: title,
      image: result.Location,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};
