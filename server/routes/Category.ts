import { Router } from "express";
import { createCategory, getAllCategory, updateCategory } from "../controller/Category";

const router = Router();

router.get('/', getAllCategory);

router.post('/', createCategory);

router.patch('/:categoryId', updateCategory);

export {router as categoryRouter};