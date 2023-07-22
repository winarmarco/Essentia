import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import Cart, { ICart } from "../model/Cart";
import User from "../model/User";
import { Schema } from "mongoose";
import { AuthenticatedRequest } from "../utils/middleware/authentication";

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).token;

  try {
    const user = await User.findById(userId).populate("cart");

    if (!user) throw new Error("Not Authenticated");

    const cart = await user.cart.populate({path: "items.item"});
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).token;
  const { _id: productId } = req.body.product;


  try {
    const user = await User.findById(userId).populate("cart");

    if (!user)  throw new Error("Not Authenticated");

    const cart: ICart =  await user.cart.populate({path: "items.item"});
  
    const index = cart.items.findIndex((cartItem) => cartItem.item.equals(productId));

    // if exist in cart...
    if (index !== -1) {
      // add quantity
      const currentQuantity = cart.items[index].quantity;
      cart.items[index].quantity++;
    } else {
      // if not exist in cart, then add the item in cart
      cart.items.push({
        item: productId,
        quantity: 1
      })
    }
    
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
}

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).token;
  const { _id: productId } = req.body.product;

  try {
    const user = await User.findById(userId).populate("cart");

    if (!user) throw new Error("Not Authenticated");

    const cart: ICart = await user.cart.populate({path: "items.item"});
    
    const index = cart.items.findIndex((cartItem) => cartItem.item.equals(productId));

    // if exist in cart, we update it
    if (index !== -1) {
      const currentQuantity = cart.items[index].quantity;
      
      // if qty = 1, we directly remove the whole item from cart
      if (currentQuantity === 1) {
        cart.items = cart.items.filter((cartItem) => cartItem.item.equals(productId));
      } else {
        cart.items[index].quantity = currentQuantity - 1;
      }
    }
    
    // if not exist in cart, we dont do anything
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    next(error)
  }
}