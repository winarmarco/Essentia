import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import Cart, { ICart } from "../model/Cart";
import User from "../model/User";
import { AuthenticatedRequest } from "../utils/middleware/Authentication";
import { ServerError } from "../utils/Errors/ServerError";
import { validationResult } from "express-validator";
import { BadRequestError } from "../utils/Errors/ValidationError";

// Get an existing shopping cart of a user
// Authorization: *
// method: GET
// path: /cart
// body: -
// return: {data: {cart: ShoppingCart}}
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).token;

  try {
    if (!userId) throw new ServerError("No User ID provided");

    const user = await User.findById(userId).populate("cart");

    if (!user) throw new NotFoundError("User not found");

    const cart = await user.cart.populate({path: "items.item"});

    const totalPrice = await cart.calculateTotalPrice();

    return res.status(201).json({
      data: {cart: cart, totalPrice: totalPrice}
    });
  } catch (error) {
    next(error);
  }
}

// Add an item to shopping cart of a user
// Authorization: *
// method: POST
// path: /cart/remove
// body: {product: {_id: string}}
// return: {data: {cart: ShoppingCart}}
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).token;

  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));

    if (!userId) throw new ServerError("No User ID provided");

    const user = await User.findById(userId).populate("cart");

    if (!user) throw new NotFoundError("User not found");

    const cart: ICart =  await user.cart.populate({path: "items.item"});
    const { _id: productId } = req.body.product;
    const index = cart.items.findIndex((cartItem) => cartItem.item.equals(productId));

    // if exist in cart...
    if (index !== -1) {
      // add quantity
      cart.items[index].quantity++;
    } else {
      // if not exist in cart, then add the item in cart
      cart.items.push({
        item: productId,
        quantity: 1
      })
    }
    
    const updatedCart = await cart.save();

    return res.status(201).json({
      data: {cart: updatedCart}
    });
  } catch (error) {
    next(error);
  }
}


// Remove an item to shopping cart of a user
// Authorization: *
// method: POST
// path: /cart/remove
// body: {product: {_id: string}}
// return: {data: {cart: ShoppingCart}}
export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).token;

  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));

    if (!userId) throw new ServerError("No User ID provided");

    const user = await User.findById(userId).populate("cart");

    if (!user) throw new NotFoundError("User not found");

    const cart: ICart = await user.cart.populate({path: "items.item"});
    const { _id: productId } = req.body.product;
    const index = cart.items.findIndex((cartItem) => cartItem.item.equals(productId));

    // if exist in cart, we update it
    if (index !== -1) {
      const currentQuantity = cart.items[index].quantity;
      
      // if qty = 1, we directly remove the whole item from cart
      if (currentQuantity === 1) {
        cart.items = cart.items.filter((cartItem) => !cartItem.item.equals(productId));
      } else {
        cart.items[index].quantity = currentQuantity - 1;
      }
    } else {
      throw new NotFoundError(`Product with id ${productId} not exist in user's cart`);
    }
    
    // if not exist in cart, we dont do anything
    const updatedCart = await cart.save();

    return res.status(201).json({
      data : {cart: updatedCart}
    });
  } catch (error) {
    next(error)
  }
}