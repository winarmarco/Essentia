import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import Cart from "../model/Cart";

export const createCart = (req: Request, res: Response, next: NextFunction) => {
  const newCart = new Cart(req.body.cart);

  try {
    const cart = newCart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
}

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) throw new NotFoundError("Cart not found!");

    res.json(cart);
  } catch (error) {
    next(error);
  }
}

export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findByIdAndUpdate(cartId, req.body.cart);

    if (!cart) throw new NotFoundError("Cart not found!");

    res.json(cart);
  } catch (error) {
    next(error);
  }
}