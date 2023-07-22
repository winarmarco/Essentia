import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import { genSalt, hash } from "bcryptjs";

const SECRET_KEY = "ASDASDSADSADWQEWQTW";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = new User(req.body.user);

  try {
    const user = await newUser.save();
    

    res.status(201).json({message: "Success"});
  }catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    next(error);
  }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body.user;

  try {
    const user = await User.signIn(email, password);

    const token = jwt.sign({_id: user._id}, SECRET_KEY, {
      expiresIn: '2 days',
    })

    if (!token) throw new Error("Cannot generate token!");

    return res.status(200).json({token: token});
  } catch (error) {

    console.log(error);
    next(error);
  }
}