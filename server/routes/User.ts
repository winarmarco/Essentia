import { Router } from "express";
import { signIn, signUp } from "../controller/User";
import { body } from "express-validator";
import User from "../model/User";

const router = Router();

// POST
// path: /signup
router.post('/signup',
  body("user.email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("Is not email")
    .custom(async (value) => {
      const userWithEmail = await User.findOne({email: value});
      if (userWithEmail) throw new Error("That email has been taken");
    }),
  body("user.firstName")
    .notEmpty().withMessage("First Name is required"),
  body("user.lastName")
    .notEmpty().withMessage("Last Name is required"),
  body("user.phoneNumber")
    .notEmpty().withMessage("Phone Number is required"),
  body("user.password")
    .notEmpty().withMessage("Password is required"),
  body("user.confirmPassword")
    .notEmpty().withMessage("Confirm Password is required")
    .custom((value, {req})=> {
      if (value !== req.body.user.password) throw new Error("Password and Confirm Password doesnt match");
    }),
 signUp);

// POST
// path: /signin
router.post('/signin',
  body("user.email").notEmpty().withMessage("Email is required"), 
  body("user.password").notEmpty().withMessage("Password is required"), 
  signIn);


export {router as userRouter};