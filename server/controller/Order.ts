import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import User from "../model/User";
import Invoice from "../model/Invoice";
import ShippingAddress from "../model/ShippingAddress";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { _id: userId } = req.body.user;
  const { discountCode } = req.body.discount;
  const shippingAddress = req.body.shippingAddress;

  try {
    // get User's cart when checkout
    const user = await User.findById(userId).populate("cart");

    if (!user) {throw new Error("Not Authenticated");}

    const cart = user.cart;
    
    // create Invoice
    const newInvoice = new Invoice({
      cart: cart,
      discountCode: discountCode,
    })

    const invoice = await newInvoice.save();

    // create shippingAddress
    const newShippingAddress = new ShippingAddress(shippingAddress);

    const shippingAddressData = newShippingAddress.save();

    // create Order
    const newOrder = new Order({
      invoice: invoice._id,
      dateOrdered: new Date(),
      shippingAddress: shippingAddressData,
    })

    const order = await newOrder.save();

    res.json(order);
  } catch (error) {
    next(error);
  }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError("Order not found!");

    res.json(order);
  } catch (error) {
    next(error);
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