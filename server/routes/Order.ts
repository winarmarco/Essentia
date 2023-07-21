import {Router} from "express";
import {createOrder} from "../controller/Order";

const router = Router();

router.post("/", createOrder);

export {router as orderRouter};
