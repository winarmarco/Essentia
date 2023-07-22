import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controller/Cart";
import { isAuth } from "../utils/middleware/authentication";

const router = Router();

router.get("/", isAuth, getCart);

router.post("/add", isAuth, addToCart);

router.post("/remove", isAuth, removeFromCart);

export {router as cartRouter};
