import {NextFunction, Request, Response} from "express";
import Order, {OrderStatus} from "../model/Order";
import {NotFoundError} from "../utils/Errors/NotFoundError";
import User, {UserRole} from "../model/User";
import Invoice, {IInvoiceItemProduct} from "../model/Invoice";
import ShippingAddress from "../model/ShippingAddress";
import Cart, {ICart} from "../model/Cart";
import {validationResult} from "express-validator";
import mongoose from "mongoose";
import {ServerError} from "../utils/Errors/ServerError";
import {AuthenticatedRequest} from "../utils/middleware/Authentication";
import {BadRequestError} from "../utils/Errors/ValidationError";
import {IProduct} from "../model/Product";
import DiscountCoupon, {IDiscountCoupon} from "../model/DiscountCoupon";

// Create new order
// method: POST
// path: /order
// Authorization: *
// body: {firstName: string, lastName: string, email: String, streetAddress: ShippingAddress, cardNumber: string, cardExpiry: string, cardCsc: string}
// return: {data: {order: Order[]}} - newly created order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest).token;

  // Start a session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new BadRequestError(JSON.stringify(validationErrors));
    }

    const {firstName, lastName, email, shippingAddress} = req.body;

    if (!userId) throw new ServerError("No User ID provided");
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const invoice = await Invoice.findOne({cart: user.cart._id}).populate({
      path: "discountCoupon",
    });


    if (!invoice) throw new NotFoundError("Invoice not found");

    // last check whether discountCoupon is applicable
    const discountCoupon: IDiscountCoupon = invoice.discountCoupon;

    if (discountCoupon) await discountCoupon.validateCoupon(user.cart);

    // check each item's availability
    const userCart: ICart = user.cart;
    await userCart.checkAvailability();
  
    const newShippingAddress = new ShippingAddress(shippingAddress);
    const shippingAddressData = await newShippingAddress.save({session}); // Pass the session

    // checkout the user cart so all the product stockQuantity is decremented
    await userCart.checkout(session);

    // make sure the total usage of a discountCoupon is incremented
    if (discountCoupon) {
      const updatedDiscountCoupon = await DiscountCoupon.findByIdAndUpdate(
        discountCoupon._id,
        {
          $inc: {usageTotal: +1},
        },
        {session}
      );

      if (!updatedDiscountCoupon)
        throw new NotFoundError("Discount Coupon not found");
    }

    // Create Order
    const newOrder = new Order({
      shippingAddress: shippingAddressData._id,
      invoice: invoice._id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateOrdered: new Date(),
    });
    const order = await newOrder.save({session}); // Pass the session

    // Empty User's cart and Add order to User's history
    const newEmptyCart = new Cart();
    const emptyCart = await newEmptyCart.save({session}); // Pass the session
    user.cart = emptyCart._id;
    user.history.push(order._id);
    const updatedUser = await user.save({session}); // Pass the session

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      data: {order: order},
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// Get all customers' order
// method: GET
// path: /order
// Authorization: ADMIN
// body: -
// return {data: {order: Order[]}}
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find().populate([
      {
        path: "invoice",
        populate: [
          {
            path: "items",
          },
          {
            path: "discountCoupon",
          },
        ],
      },
    ]);

    if (!orders) throw new NotFoundError("Order not found!");

    return res.status(200).json({
      data: {orders},
    });
  } catch (error) {
    next(error);
  }
};

// Get an order based on the given orderId
// method: GET
// path: /order/<orderId>
// Authorization: *
// body: -
// return: {data: {order: Order[]}}
export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest).token;
  const {orderId} = req.params;

  try {
    if (!userId) throw new ServerError("No User ID provided");

    const user = await User.findOne({_id: userId, history: orderId});

    if (!user) throw new NotFoundError("User not found");

    // Reject User if user is a customer trying to access another customer
    // order history
    if (user.role === UserRole.CUSTOMER.toString()) {
      if (!user.history || user.history.length == 0)
        throw new NotFoundError(
          `User has no history with orderId '${orderId}'`
        );
    }

    // Populate the order
    const populatedFoundOrder = await Order.findById(orderId).populate([
      {
        path: "invoice",
        populate: [
          {
            path: "items",
          },
          {
            path: "discountCoupon",
          },
        ],
      },
      {
        path: "shippingAddress",
      },
    ]);

    if (!populatedFoundOrder) throw new NotFoundError("Order not found!");

    return res.status(200).json({
      data: {order: populatedFoundOrder},
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest).token;

  try {
    if (!userId) throw new ServerError("No User ID provided");

    const user = await User.findOne({_id: userId}).populate("history");

    if (!user) throw new NotFoundError("User not found");

    return res.status(200).json({
      data: {
        order: user.history,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing order
// method: PATCH
// path: /order/<orderId>
// Authorization: ADMIN
// body: {firstName: string, lastName: string, email: String, streetAddress: ShippingAddress, cardNumber: string, cardExpiry: string, cardCsc: string}
// return: {data: {order: Order[]}} - newly created order
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {orderId} = req.params;

  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new BadRequestError(JSON.stringify(validationErrors));
    }

    const order = await Order.findById(orderId);

    if (!order) throw new NotFoundError("Order not found!");

    const populatedOrder = await order.populate([{path: "shippingAddress"}]);

    const {shippingAddress} = populatedOrder;

    let updatedShippingAddress;
    if (req.body.shippingAddress) {
      updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(
        shippingAddress._id,
        {$set: req.body.shippingAddress},
        {new: true}
      );
    }

    Object.assign(populatedOrder, req.body);
    if (updatedShippingAddress)
      populatedOrder.shippingAddress = updatedShippingAddress;

    await populatedOrder.save();

    return res.status(201).json({
      data: {order},
    });
  } catch (error) {
    next(error);
  }
};
