import { Router } from "express";
import { createInvoice } from "../controller/Invoice";

const router = Router();

router.post("/", createInvoice);

export { router as invoiceRouter };