import { Router } from "express";
import { createCategory, updateCategory } from "../controller/Category";

const router = Router();

router.post('/', createCategory);

router.patch('/:categoryId', updateCategory);

export {router as categoryRouter};