import { Router } from "express";
import { createProduct, deleteProduct, getProductByCategory, getProductById, updateProduct } from "../controller/Product";


const router = Router();
// GET
// path: /product?category=<categoryId>
// Get all product with category === <categoryId>
router.get('/product', getProductByCategory);

// GET
// path: /product/:productId
// Get specific product
router.get('/product/:productId', getProductById);

// PATCH
// path: /prodict/:productId
// Edit product with id = <productId>
router.patch('/product/:productId', updateProduct);

// DELETE
// path: /product/:productId
// delete product with id = <productId>
router.delete('/product/:productId', deleteProduct);

// POST
// path: /product
// create new product
router.post('/product', createProduct);


export default router;