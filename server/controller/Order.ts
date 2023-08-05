import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import User from "../model/User";
import Invoice from "../model/Invoice";
import ShippingAddress from "../model/ShippingAddress";
import Cart from "../model/Cart";
import { validationResult } from "express-validator";
import { parseExpressValidatorError } from "../utils/helperFunctions/ErrorParser";
import { CustomError } from "../utils/Errors/CustomError";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers.authorization;
  
  
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      console.log(validationErrors.array());
      throw new Error(parseExpressValidatorError(validationErrors, true));
    }

    const { firstName, lastName, email, discountCoupon, shippingAddress } = req.body;
    // get User's cart when checkout
    const user = await User.findById(userId).populate("cart");

    if (!user) {throw new Error("Not Authenticated");}

    const cart = user.cart;
    
    // create Invoice
    const newInvoice = new Invoice({
      cart: cart._id,
      discountCode: (discountCoupon) && (discountCoupon._id)
    })

    const invoice = await newInvoice.save();
    console.log(invoice);

    // create shippingAddress
    const newShippingAddress = new ShippingAddress(shippingAddress);

    const shippingAddressData = await newShippingAddress.save();

    console.log(shippingAddressData);

    // create Order
    const newOrder = new Order({
      shippingAddress: shippingAddressData._id,
      invoice: invoice._id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateOrdered: new Date(),
    })

    const order = await newOrder.save();

    // update user's cart and history
    const newEmptyCart = new Cart();
    const emptyCart = await newEmptyCart.save();
    user.cart = emptyCart._id;
    user.history.push(order._id);

    const updatedUser = await user.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({message: (error as CustomError).message});
  }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate([
      {
        path: "invoice",
        populate: [
          {
            path: "cart",
            populate: {
              path: "items",
              populate: "item",
            },
          },
          {
            path: "discountCoupon",
          }
        ]
      },
      {
        path: "shippingAddress",
      }
    ]);

    if (!order) throw new NotFoundError("Order not found!");

    res.json(order);
  } catch (error) {
    console.log(error)
  }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find().populate([
      {
        path: "invoice",
        populate: [
          {
            path: "cart",
            populate: {
              path: "items",
              populate: "item",
            },
          },
          {
            path: "discountCoupon",
          }
        ]
      },
    ]);


    if (!orders) throw new NotFoundError("Order not found!");

    res.json(orders);
  } catch (error) {
    console.log(error);
  }
}

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(orderId, req.body.order);

    if (!order) throw new NotFoundError("Order not found!");

    res.json(order);
  } catch (error) {
    next(error);
  }
}