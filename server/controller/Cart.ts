import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import Cart from "../model/Cart";
import User from "../model/User";

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const { _id : userId } = req.body.user;

  try {
    const user = await User.findById(userId).populate("cart");
    const cart = user?.cart;
    console.log(user);

    if (!cart) throw new NotFoundError("Cart not found!");

    res.json(cart);
  } catch (error) {
    next(error);
  }
}

export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.body.user;


  try {
    const user = await User.findById(userId).populate("cart");
    const cart = user?.cart;
    

    if (!cart) throw new NotFoundError("Cart not found!");

    res.json(cart);
  } catch (error) {
    next(error);
  }
}