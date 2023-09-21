import {Router} from "express";
import {
  createProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
  updateProduct,
} from "../controller/Product";
import upload from "../utils/middleware/upload";
import {body} from "express-validator";
import {parseFormData} from "../utils/middleware/parseFormData";
import { isAdmin } from "../utils/middleware/Authorization";
import { isAuth } from "../utils/middleware/Authentication";
import Category from "../model/Category";
import { validateId } from "../utils/middleware/ValidateId";
import Product from "../model/Product";

const router = Router();


// Get products based on the given category
// Authorization: *
// method: GET
// path: /products?category=<categoryId>
// body: -
router.get('/', getProductsByCategory);


// Get a product based on the given productId
// Authorization: *
// method: GET
// path: /products/<productId>
// body: -
router.get("/:productId", getProductById);


// Create a product
// Authorization: ADMIN
// method: POST
// path: /products
// body: {product: Product}
router.post("/", upload.array("images"),
  parseFormData,
  isAuth,
  isAdmin,
  body("product.name").notEmpty().withMessage("Product name is required"),
  body("product.price").notEmpty().withMessage("Price is rqeuired"),
  body("product.category")
    .notEmpty().withMessage("Product Category should not be Empty")
    .custom(async (value) => {
      const category = await Category.findById(value);

      if (!category) return Promise.reject(`Category with id ${value} is invalid`);

      return Promise.resolve();
    }),
  body("product.stockQuantity")
    .notEmpty().withMessage("Stock Quantity is required")
    .isNumeric().withMessage("Invalid stock quantity"),
  body("product.showOnLandingCarousel")
    .notEmpty().withMessage("Show on landing carousel is required")
    .isBoolean().withMessage("Invalid Show on landing carousel"),
  body("product.newProduct")
    .notEmpty().withMessage("Show on landing carousel is required")
    .isBoolean().withMessage("Invalid Show on landing carousel"),
  body("product.description").notEmpty().withMessage("Description is required"),
  body("product.shortDescription")
    .notEmpty()
    .withMessage("Short description is required"),
  body("images").custom(async (value, {req}) => {
    const fileUploaded = req.files.length;
    if (fileUploaded < 2) {
      return Promise.reject("Image must be at least 2");
    }
  }),
  createProduct
);


// Update a product
// Authorization: ADMIN
// method: PATCH
// path: /products/<productId>
// body: {product: Product}
router.patch(
  "/:productId",
  isAuth,
  isAdmin,
  validateId({path: "params.productId", model: Product}),
  upload.array("images"),
  parseFormData,
  body("product.name")
    .optional().notEmpty().withMessage("Product name is required"),
  body("product.price")
    .optional().notEmpty().withMessage("Price is rqeuired"),
  body("product.stockQuantity")
    .optional()
    .notEmpty()
    .withMessage("Stock Quantity is required")
    .isNumeric()
    .withMessage("Invalid stock quantity"),
  body("product.showOnLandingCarousel")
    .optional()
    .notEmpty()
    .withMessage("Show on landing carousel is required")
    .isBoolean()
    .withMessage("Invalid Show on landing carousel"),
  body("product.newProduct")
    .optional()
    .notEmpty()
    .withMessage("Show on landing carousel is required")
    .isBoolean()
    .withMessage("Invalid Show on landing carousel"),
  body("product.description")
    .optional().notEmpty().withMessage("Description is required"),
  body("product.shortDescription")
    .optional()
    .notEmpty()
    .withMessage("Short description is required"),
  body("product.images")
    .optional()
    .custom(async (value, {req}) => {
    const currentImages = value.length;
    const fileUploaded = req.files.length;

    const totalImages = currentImages + fileUploaded;
    if (totalImages < 2) {
      return Promise.reject("Image must be at least 2");
    }
  }),
  updateProduct
);


// Delete a product
// Authorization: ADMIN
// method: DELETE
// path: /products/<productId>
// body: -
router.delete("/:productId", 
isAuth,
isAdmin,
deleteProduct);


export {router as productRouter};
