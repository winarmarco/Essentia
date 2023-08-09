import { NextFunction, Request, Response } from "express";
import Category from "../model/Category";
import Product from "../model/Product";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const newCategory = new Category(req.body.category);

  try {
    const category = await newCategory.save();

    res.status(200).json({category});
  } catch (error) {
    next(error);
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const {categoryId} = req.params;
  try { 
    const product =  await Product.findByIdAndUpdate(categoryId, req.body, {new: true});

    res.status(200).json({product});
  } catch (error) { 
    next(error);
  }
}

export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();

    res.status(200).json({category: categories});
  } catch (error) {
    res.status(400).json({error});
  }
}