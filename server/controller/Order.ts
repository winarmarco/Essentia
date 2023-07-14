import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";

export const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const newOrder = new Order(req.body.order);

  try {
    const order = newOrder.save();

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