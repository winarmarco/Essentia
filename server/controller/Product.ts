import { NextFunction, Request, Response } from "express";
import Product from "../model/Product";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import cloudinary from "cloudinary";
import { validationResult } from "express-validator";
import { parseExpressValidatorError } from "../utils/helperFunctions/ErrorParser";
import { CustomError } from "../utils/Errors/CustomError";
import { MongooseError } from "mongoose";

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

export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();

    if (!products) throw new NotFoundError("Product not found")

    return res.json(products);
  } catch (error) {
    console.log(error);
  }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  try {
    console.log(req.body)
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      console.log(validationErrors.array());
      throw new Error(parseExpressValidatorError(validationErrors, false));
    }

    const productData = req.body.product;
  
    // POST all the file that are uploaded to cloudinary
    const urls: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      urls.push(result.url);
    }

    const product = await Product.findById(productId);
    
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    // assign the other field
    Object.assign(product, productData);
    // push the newly uploaded url to product.images
    Object.values(urls).forEach((url) => {
      product.images.push(url);
    })
    
    const updatedProduct = await product.save();
    console.log({updatedProduct});
    console.log({urls});

    return res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: (error as CustomError).message});
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
  console.log(req.body)
  const newProduct = new Product(req.body.product);
  
  try {
    
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new Error(parseExpressValidatorError(validationErrors, false));
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
    res.status(400).json({message: (error as MongooseError).message});
  }
}