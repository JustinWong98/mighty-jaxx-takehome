import { Request, Response } from "express";

import { Product, productInterface } from "../models/productModel";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productList: productInterface[] = await Product.find();
    res.status(200).json(productList);
  } catch (err) {
    res.status(404).json(`Error: ${err}`);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const productForm = req.body;

  const newProduct = new Product(productForm);
  try {
    // to query for SKU and reject if there is an existing identical SKU
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};
