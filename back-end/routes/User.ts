import { Router } from "express";
import { signIn, signUp } from "../controller/User";
import { body } from "express-validator";
import User from "../model/User";

const router = Router();

// User sign up
// Authorization: *
// method: POST
// path: /signup
// body: {user: {email: string, firstName: string, lastName: string, phoneNumber: string, password: string, confirmPassword: string}}
router.post('/signup',
  body("user.email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("Is not email")
    .custom(async (value) => {
      const userWithEmail = await User.findOne({email: value});
      if (userWithEmail) return Promise.reject("That email has been taken");
      return Promise.resolve();
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
    .custom(async (value, {req})=> {
      const password = req.body.user.password;
      if (value !== password) return Promise.reject("Password and Confirm Password doesnt match");
      return Promise.resolve();
    })
  ,
 signUp);

// User sign in
// Authorization: *
// method: POST
// path: /signin
// body: {user: {email: string, password: string}}
router.post('/signin',
  body("user.email").notEmpty().withMessage("Email is required"), 
  body("user.password").notEmpty().withMessage("Password is required"), 
  signIn);


export {router as userRouter};