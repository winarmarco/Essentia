import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import Invoice from "../model/Invoice";
import DiscountCoupon from "../model/DiscountCoupon";
import Cart from "../model/Cart";

export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const discountCoupon = await DiscountCoupon.findOne({discountCode: req.body.invoice.discountCode});

    if (!discountCoupon) throw new NotFoundError("Discount Coupon not found");

    const cart = await Cart.findById(req.body.cart);

    if (!cart) throw new NotFoundError("Cart not found");

    await discountCoupon.validateCoupon(cart);

    const existingInvoice = await Invoice.findOne({cart : req.body.invoice.cart._id});

    if (existingInvoice) {
      return res.status(201).json({data: {invoice: existingInvoice}});
    }

    const newInvoice = new Invoice(req.body.invoice);
    const invoice = newInvoice.save();

    res.status(201).json({data: {invoice}});
  } catch (error) {
    next(error);
  }
}

export const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
  const { invoiceId } = req.params;

  try {
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) throw new NotFoundError("Invoice not found");

    return res.status(200).json({data: {invoice}});
  } catch (error) {
    next(error);
  }
} 

export const updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
  const { invoiceId } = req.params;

  try {
    const invoice = await Invoice.findByIdAndUpdate(invoiceId, req.body.invoice);

    if (!invoice) throw new NotFoundError("Invoice not found!");

    res.status(200).json({data: {invoice}});
  } catch (error) {
    next(error);
  }
}