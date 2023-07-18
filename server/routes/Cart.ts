import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controller/Cart";

const router = Router();

router.get("/", getCart);

router.post("/add", addToCart);

router.post("/remove", removeFromCart);

export {router as cartRouter};
