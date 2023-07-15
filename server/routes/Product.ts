import { Router } from "express";
import { createProduct, deleteProduct, getProductByCategory, getProductById, updateProduct } from "../controller/Product";
import upload from "../utils/middleware/upload";


const router = Router();
// GET
// path: /product?category=<categoryId>
// Get all product with category === <categoryId>
router.get('/', getProductByCategory);

// GET
// path: /product/:productId
// Get specific product
router.get('/:productId', getProductById);

// PATCH
// path: /prodict/:productId
// Edit product with id = <productId>
router.patch('/:productId', updateProduct);

// DELETE
// path: /product/:productId
// delete product with id = <productId>
router.delete('/:productId', deleteProduct);

// POST
// path: /product
// create new product
router.post('/', upload.array("images"),  createProduct);


export {router as productRouter};