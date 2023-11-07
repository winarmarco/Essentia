import { Router } from "express";
import { createCategory, getAllCategory, updateCategory } from "../controller/Category";
import { isAuth } from "../utils/middleware/Authentication";
import { body } from "express-validator";
import Category from "../model/Category";
import { isAdmin } from "../utils/middleware/Authorization";
import { validateId } from "../utils/middleware/ValidateId";

const router = Router();

// Get All Product Category
// Authorization: *
// method: GET
// path: /category
// body: -
router.get('/', getAllCategory);

// Create a new Category
// Authorization: ADMIN
// method: POST
// path: /category
// body: {category: {name:string, categoryKey: string}}
router.post('/', 
  isAuth,
  isAdmin,
  body("category.name")
    .notEmpty().withMessage("Category name is required"),
  body("category.categoryKey")
    .notEmpty().withMessage("Category Key is reuqired")
    .custom(async (value) => {
      const category = await Category.findOne({categoryKey: value});

      if (category) return Promise.reject("Category Key is already been taken");

      return Promise.resolve();
    }),
  createCategory);

// Update an existing Category
// Authorization: ADMIN
// method: PATCH
// path: /category/<categoryId>
// body: {category: {name:string, categoryKey: string}}
router.patch('/:categoryId', 
  isAuth,
  isAdmin,
  validateId({path: 'params.categoryId', model: Category}),
  body("category.categoryKey")
    .custom(async (value) => {
      const category = await Category.findOne({categoryKey: value});

      if (category) return Promise.reject("Category Key is already been taken");

      return Promise.resolve();
    }),
  updateCategory);

export {router as categoryRouter};