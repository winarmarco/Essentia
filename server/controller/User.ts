import { NextFunction, Request, Response } from "express";
import User from "../model/User";
import { NotFoundError } from "../utils/Errors/NotFoundError";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = new User(req.body.user);

  try {
    const user = await newUser.save();

    res.status(201).json(user);
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

    return res.status(200).json({message: "Authenticated"});
  } catch (error) {

    console.log(error);
    next(error);
  }
}