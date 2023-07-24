import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { CustomError } from "../utils/Errors/CustomError";
import { Error, MongooseError } from "mongoose";
import { validationResult } from "express-validator";
import { parseExpressValidatorError, parseMongooseValidationError } from "../utils/helperFunctions/ErrorParser";

const SECRET_KEY = "ASDASDSADSADWQEWQTW";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = new User(req.body.user);

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new Error(parseExpressValidatorError(validationErrors));
    }

    const user = await newUser.save();

    

    res.status(201).json({message: "Success"});
  }catch (error) {
    // if (error instanceof Error && 'code' in error && error.code === 11000) {
    //   return res.status(400).json({ message: 'Email already exists' });
    // } 
    
    if ((error as MongooseError).name === "ValidationError") {
      const errorMessage = parseMongooseValidationError((error as Error.ValidationError))
      res.status(400).json({message: errorMessage});
    } else {
      res.status(400).json({message: (error as CustomError).message});
    }
  }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new Error(parseExpressValidatorError(validationErrors));
    }

    const { email, password } = req.body.user;
    const user = await User.signIn(email, password);

    const token = jwt.sign({_id: user._id}, SECRET_KEY, {
      expiresIn: '2 days',
    })

    if (!token) throw new Error("Cannot generate token!");

    return res.status(200).json({token: token});
  } catch (error) {
    const mongooseError = error as MongooseError;
    res.status(400).json({message: mongooseError.message});
  }
}