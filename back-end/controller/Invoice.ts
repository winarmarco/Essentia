import {NextFunction, Request, Response} from "express";
import Order from "../model/Order";
import {NotFoundError} from "../utils/Errors/NotFoundError";
import Invoice, {IInvoice} from "../model/Invoice";
import DiscountCoupon, {IDiscountCoupon} from "../model/DiscountCoupon";
import Cart, {ICart} from "../model/Cart";
import {AuthenticatedRequest} from "../utils/middleware/Authentication";
import User from "../model/User";
import {UnauthorizedError} from "../utils/Errors/UnauthorizedError";
import * as lodash from "lodash";

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest).token;

  try {
    // get user's cart
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: {path: "items", populate: "item"},
    });
    if (!user) throw new NotFoundError("User not found");

    // parse the discountCoupon if there is any
    let discountCoupon;

    if (req.body.discountCoupon) {
      const {discountCode} = req.body.discountCoupon;
      discountCoupon = await DiscountCoupon.findOne({discountCode});

      console.log(discountCoupon);

      if (!discountCoupon) throw new NotFoundError("Discount Coupon not found");

      await discountCoupon.validate(user.cart);
    }

    // create an updated invoice item
    const invoiceItems: IInvoice["items"] = user.cart.items.map(
      (cartItem: ICart["items"][0]) => {
        const {item, quantity} = cartItem;
        console.log(cartItem);

        return {
          item: {
            name: item.name,
            price: item.price,
            images: item.images,
          },
          originalItem: item._id,
          quantity: quantity,
        };
      }
    );

    // find existing invoice with cart._id, and attach current items and discountCoupon
    const existingInvoice = await Invoice.findOneAndUpdate(
      {cart: user.cart._id},
      {$set: {items: invoiceItems, discountCoupon: discountCoupon}}
    );

    // if there is an existing invoice, return it
    if (existingInvoice) {
      return res.status(201).json({data: {invoice: existingInvoice}});
    }

    // create a new invoice
    const newInvoice = new Invoice({
      items: invoiceItems,
      cart: user.cart._id,
      discountCoupon: discountCoupon,
    });

    const invoice = await newInvoice.save();

    return res.status(201).json({data: {invoice}});
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest).token;
  const {invoiceId} = req.params;

  try {
    const user = await User.findById(userId).populate({path: "cart"});

    if (!user) throw new NotFoundError("User not found");

    const invoice = await Invoice.findById(invoiceId).populate([
      {path: "cart"},
      {path: "discountCoupon"},
    ]);

    if (!invoice) throw new NotFoundError("Invoice not found");

    if (!invoice.cart._id.equals(user.cart._id))
      throw new UnauthorizedError("Not Authorized");

    // filter discountCoupon info, and calculate total discount
    const filteredDiscountCoupon = lodash.pick(
      invoice.discountCoupon as IDiscountCoupon,
      ["discountCode", "percentAmount", "discountAmount"]
    );

    const totalDiscountAmount = await (
      invoice.discountCoupon as IDiscountCoupon
    ).applyCoupon(user.cart);

    // calculate total price in cart
    const totalPrice = await (user.cart as ICart).calculateTotalPrice();

    return res.status(200).json({
      data: {
        invoice: {
          items: invoice.items,
          discountCoupon: filteredDiscountCoupon,
        },
        totalPrice: totalPrice,
        totalDiscountAmount: totalDiscountAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {invoiceId} = req.params;

  try {
    const invoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      req.body.invoice
    );

    if (!invoice) throw new NotFoundError("Invoice not found!");

    res.status(200).json({data: {invoice}});
  } catch (error) {
    next(error);
  }
};
