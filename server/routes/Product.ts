import {Router} from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
  getProductById,
  updateProduct,
} from "../controller/Product";
import upload from "../utils/middleware/upload";
import {body, check} from "express-validator";
import {parseFormData} from "../utils/middleware/parseFormData";

const router = Router();
// GET
// path: /product?category=<categoryId>
// Get all product with category === <categoryId>
router.get("/", getProductByCategory);

// GET
// path: /product/:productId
// Get specific product
router.get("/:productId", getProductById);

// POST
// path: /product
// create new product
router.post("/add", upload.array("images"),
  parseFormData,
  body("product.name").notEmpty().withMessage("Product name is required"),
  body("product.price").notEmpty().withMessage("Price is rqeuired"),
  body("product.stockQuantity")
    .notEmpty()
    .withMessage("Stock Quantity is required")
    .isNumeric()
    .withMessage("Invalid stock quantity"),
  body("product.showOnLandingCarousel")
    .notEmpty()
    .withMessage("Show on landing carousel is required")
    .isBoolean()
    .withMessage("Invalid Show on landing carousel"),
  body("product.newProduct")
    .notEmpty()
    .withMessage("Show on landing carousel is required")
    .isBoolean()
    .withMessage("Invalid Show on landing carousel"),
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


// POST
// path: /product/:productId
// Edit product with id = <productId>
router.post(
  "/:productId",
  upload.array("images"),
  parseFormData,
  body("product.name").notEmpty().withMessage("Product name is required"),
  body("product.price").notEmpty().withMessage("Price is rqeuired"),
  body("product.stockQuantity")
    .notEmpty()
    .withMessage("Stock Quantity is required")
    .isNumeric()
    .withMessage("Invalid stock quantity"),
  body("product.showOnLandingCarousel")
    .notEmpty()
    .withMessage("Show on landing carousel is required")
    .isBoolean()
    .withMessage("Invalid Show on landing carousel"),
  body("product.newProduct")
    .notEmpty()
    .withMessage("Show on landing carousel is required")
    .isBoolean()
    .withMessage("Invalid Show on landing carousel"),
  body("product.description").notEmpty().withMessage("Description is required"),
  body("product.shortDescription")
    .notEmpty()
    .withMessage("Short description is required"),
  body("product.images").custom(async (value, {req}) => {
    const fileUploaded = req.files ? req.files.length : 0;
    const currentProductImages = value.length;

    // verify the total images of the productImage
    const totalImages = fileUploaded + currentProductImages;
    if (totalImages < 2) {
      return Promise.reject("Image must be at least 2");
    }
  }),
  updateProduct
);

// DELETE
// path: /product/:productId
// delete product with id = <productId>
router.delete("/:productId", deleteProduct);


// GET
// path: /product
// get all product
router.get("/", getAllProduct);

export {router as productRouter};
