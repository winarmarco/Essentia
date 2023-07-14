import { NextFunction, Request, Response } from "express";
import Product from "../model/Product";
import { NotFoundError } from "../utils/Errors/NotFoundError";

export const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category }  = req.query;

  try {
    const products = await Product.find({ category });
    

    return res.json(products);
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

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
    const product = await newProduct.save();

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}