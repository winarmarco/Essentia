import { Router } from "express";
import { signIn, signUp } from "../controller/User";

const router = Router();

// POST
// path: /signup
router.post('/signup', signUp);

// POST
// path: /signin
router.post('/signin', signIn);


export {router as userRouter};