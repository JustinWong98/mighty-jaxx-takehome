import e, { Request, Response } from "express";
import { s3Edit, s3Upload } from "../middleware/s3Service";
import { Product, productInterface } from "../models/productModel";
import fs from "fs";
import { v4 } from "uuid";
import { resourceLimits } from "worker_threads";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productList: productInterface[] = await Product.find();
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

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const queriedSKU = id;
  try {
    const existingProductWithSKU = await Product.findOne({
      sku: queriedSKU,
    });
    if (!existingProductWithSKU) {
      return res.status(400).json({
        message: "There is no Product with the SKU in the listing!",
      });
    }
    res.status(201).json(existingProductWithSKU);
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};

const newDataHandler = async ({
  SKU,
  title,
  imageFile,
  isImageNew,
}: {
  SKU: string;
  title: string;
  imageFile: Express.Multer.File;
  isImageNew: boolean;
}) => {
  if (isImageNew) {
    const result = await s3Upload(imageFile);
    return {
      sku: SKU,
      title: title,
      image: result.Location,
    };
  }
  return {
    sku: SKU,
    title: title,
  };
};

export const editProduct = async (req: Request, res: Response) => {
  const { SKU, title } = req.body;
  const { id } = req.params;
  const oldSKU = id;
  try {
    // find product with old SKU
    const imageFile = <Express.Multer.File>req.file;
    const isImageNew = <boolean>await s3Edit(imageFile);
    const newData = await newDataHandler({
      SKU,
      title,
      imageFile,
      isImageNew,
    });
    const existingProductWithSKU = await Product.findOneAndUpdate(
      {
        sku: oldSKU,
      },
      {
        $set: newData,
      }
    );
    // save it to state and force a re render?
    if (!existingProductWithSKU) {
      return res.status(400).json({
        message: "There is no Product with the SKU in the listing!",
      });
    }
    const productList: productInterface[] = await Product.find();
    res.status(201).json(productList);
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    Product.findOneAndDelete({
      sku: id,
    })
      .then(async () => {
        const productList: productInterface[] = await Product.find();
        res.status(201).json(productList);
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } catch (err) {
    res.status(409).json(`Error: ${err}`);
  }
};
