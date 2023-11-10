import { Router } from "express";
import { createInvoice, getInvoice } from "../controller/Invoice";
import { isAuth } from "../utils/middleware/Authentication";

const router = Router();

router.post("/", isAuth, createInvoice);

router.get("/:invoiceId", isAuth, getInvoice);

export { router as invoiceRouter };