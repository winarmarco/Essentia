import { Router } from "express";
import { getCart, updateCart } from "../controller/Cart";

const router = Router();

router.get("/", getCart);

router.patch("/", updateCart);

export {router as cartRouter};
