import { NextFunction, Request, Response } from "express";
import Category from "../model/Category";
import Product from "../model/Product";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/Errors/ValidationError";

// Get All Product Category
// Authorization: *
// method: GET
// path: /category
// body: -
// return: {data: {category: Category[]}}
export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({data: {category: categories}});
  } catch (error) {
    next(error);
  }
}

// Create a new Category
// Authorization: *
// method: POST
// path: /category
// body: {category: {name:string, categoryKey: string}}
// return: {data: {category: Category}}
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const newCategory = new Category(req.body.category);
  
  try {
    const validationErrors = await validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));
    
    const category = await newCategory.save();

    return res.status(201).json({data: {category}});
  } catch (error) {
    next(error);
  }
}

// Update an existing Category
// Authorization: *
// method: PATCH
// path: /category/<categoryId>
// body: {category: {name:string, categoryKey: string}}
// return: {data: {category: Category}}
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId } = req.params;

  try { 
    const validationErrors = await validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));

    const category =  await Category.findByIdAndUpdate(categoryId, req.body, {new: true});

    if (!category) throw new NotFoundError("Category not found");

    return res.status(201).json({data: {category}});
  } catch (error) { 
    next(error);
  }
}
