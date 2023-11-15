import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { CustomError } from "../utils/Errors/CustomError";
import { Error, MongooseError } from "mongoose";
import { validationResult } from "express-validator";
import { parseExpressValidatorError, parseMongooseValidationError } from "../utils/helperFunctions/ErrorParser";
import { BadRequestError } from "../utils/Errors/ValidationError";

// User sign up
// method: POST
// path: /signup
// Authorization: *
// body: {user: {email: string, firstName: string, lastName: string, phoneNumber: string, password: string, confirmPassword: string}}
// return 
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = new User(req.body.user);

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new BadRequestError("Validation Error", validationErrors);
    }

    const user = await newUser.save();

    return res.status(200).json({message: "Successfully signed up"});
  }catch (error) {
    next(error);
  }
}


// User sign in
// method: POST
// path: /signin
// Authorization: *
// body: {user: {email: string, password: string}}
// return {data: {token: string}}
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new BadRequestError("Validation Error", validationErrors);
    }

    const { email, password } = req.body.user;
    const user = await User.signIn(email, password);

    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY || "SECRET_KEY", {
      expiresIn: '2 days',
    })
    
    if (!token) throw new Error("Cannot generate token!");
  
    return res.status(200).json({data: {token: token}});
  } catch (error) {
    next(error);
  }
}