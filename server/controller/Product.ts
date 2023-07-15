import { NextFunction, Request, Response } from "express";
import Product from "../model/Product";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import cloudinary from "cloudinary";

export const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category }  = req.query;

  try {
    const products = await Product.find();
    

    return res.json(products);
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  console.log(req.params);

  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new NotFoundError("Product not found")
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {new : true});

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
}


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return res.json({message: 'Product deleted'});
  } catch (error) {
    next(error);
  }
}


export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const newProduct = new Product(req.body.product);
  
  try {
    if (!req.files) {
      throw new Error("No file uploaded");
    }

    if (Object.values(req.files).length < 2) {
      throw new Error("Image file must at least 2");
    }

    const urls: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      urls.push(result.url);
    }

    newProduct.images = urls;
    const product = await newProduct.save();

    return res.status(201).json(product);
  } catch (error) {
    console.log({error});
    next(error);
  }
}