import { NextFunction, Request, Response } from "express";
import Product from "../model/Product";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import cloudinary from "cloudinary";
import { validationResult } from "express-validator";
import { parseExpressValidatorError } from "../utils/helperFunctions/ErrorParser";
import { CustomError } from "../utils/Errors/CustomError";
import mongoose, { MongooseError } from "mongoose";
import { Multer } from "multer";
import { BadRequestError } from "../utils/Errors/ValidationError";


// Get products based on the given category
// Authorization: *
// method: GET
// path: /products
// body: -
// return: {data: {products: Product[]}}
export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category }  = req.query;

  try {
    let products;

    // Check whether there is a query of category,
    // if yes, find product with the given category
    if (category) {      
      if (!mongoose.Types.ObjectId.isValid(category as string)) throw new NotFoundError(`Product with category '${category}' not found`);

      products = await Product.find({category: category});
    } else {
      products = await Product.find();
    }

    return res.json({data: {
      products: products,
    }});
  } catch (error) {
    next(error);
  }
}


// Get a product based on the given productId
// Authorization: *
// method: GET
// path: /products/<productId>
// body: -
// return: {data : {product: Product}}
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) throw new NotFoundError("Product not found")

    return res.json({
      data: {product: product}
    });
  } catch (error) {
    next(error);
  }
}


// Create a product
// Authorization: ADMIN
// method: GET
// path: /products/<productId>
// body: -
// return: {data : {product: Product}}
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const newProduct = new Product(req.body.product);
  
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));

    const urls: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      urls.push(result.url);
    }

    newProduct.images = urls;
    const product = await newProduct.save();

    return res.status(201).json({data: product});
  } catch (error) {
    next(error);
  }
}


// Update a product
// Authorization: ADMIN
// method: POST
// path: /products/<productId>
// body: {product: Product}
// return: {data: {product: Product}}
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const newProductData = req.body.product;

  try {
    const validationErrors = validationResult(req);
    
    if (!validationErrors.isEmpty()) {
      throw new BadRequestError(JSON.stringify(validationErrors));
    }
    
    const product = await Product.findById(productId);

    if (!product) throw new NotFoundError("Product not found");

    // Upload all file to cloudinary
    const urls: string[] = [];
    for (const file of req.files as Express.Multer.File[]) {
      const result = await cloudinary.v2.uploader.upload(file.path);
      urls.push(result.url);
    }

    // Override the value of product
    Object.assign(product, newProductData);
    // Push the new uploaded urls to the product images
    Object.values(urls).forEach((url) => {
      product.images.push(url);
    })
    
    const updatedProduct = await product.save();

    return res.json({data: updatedProduct});
  } catch (error) {
    res.status(400).json({message: (error as CustomError).message});
  }
}


// Delete a product
// Authorization: ADMIN
// method: DELETE
// path: /products/<productId>
// body: -
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  
  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) throw new NotFoundError("Product not found");
    
    return res.json({message: 'Product deleted'});
  } catch (error) {
    next(error);
  }
}