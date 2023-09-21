import { NextFunction, Request, Response } from "express";
import Order from "../model/Order";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import Invoice from "../model/Invoice";

export const createInvoice = (req: Request, res: Response, next: NextFunction) => {
  const newInvoice = new Invoice(req.body.invoice);

  try {
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