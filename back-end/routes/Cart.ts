import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controller/Cart";
import { isAuth } from "../utils/middleware/Authentication";
import { body } from "express-validator";

const router = Router();

// Get an existing shopping cart of a user
// Authorization: *
// method: GET
// path: /cart
// body: -
router.get("/", isAuth, getCart);


// Add an item to shopping cart of a user
// Authorization: *
// method: POST
// path: /cart/add
// body: {product: {_id: string}}
router.post("/add", isAuth,
  body("product._id")
    .notEmpty().withMessage("Product id is required"),
  addToCart);

// Remove an item to shopping cart of a user
// Authorization: *
// method: POST
// path: /cart/remove
// body: {product: {_id: string}}
router.post("/remove", isAuth,
  body("product._id")
    .notEmpty().withMessage("Product id is required"),
  removeFromCart);

export {router as cartRouter};
