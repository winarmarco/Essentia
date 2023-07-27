import {Router} from "express";
import {createOrder, getOrder, getOrders} from "../controller/Order";
import { body } from "express-validator";

const router = Router();

router.post("/", 
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
  body("shippingAddress.country")
    .notEmpty().withMessage("Country is required"),
  body("shippingAddress.streetAddress")
    .notEmpty().withMessage("Street Address is required"),
  body("shippingAddress.state")
    .notEmpty().withMessage("State is required"),
  body("shippingAddress.town")
    .notEmpty().withMessage("Town is required"),
  body("shippingAddress.zipCode")
    .notEmpty().withMessage("Zip Code is required")
    .isNumeric().isLength({min: 4, max: 6}).withMessage("Invalid zip code"),
  body("cardNumber") 
    .notEmpty().withMessage("Card Number is required")
    .custom(async (input) => {
      if (!/([0-9]{4}\s){3}[0-9]{4}/.test(input)) return Promise.reject("Invalid Card Number");
    }),
  body("cardExpiry")
    .notEmpty().withMessage("Card Expiry is required")
    .custom(async (input) => {
      if (!/[0-9]{2}\/[0-9]{2}/.test(input)) return Promise.reject("Invalid card expiry");
      const [month, year] = input.split("/");
    
      if (!(1 <= Number(month) && Number(month) <= 12)) {
        return Promise.reject("Invalid card expiry");
      }
    }),
  body("cardCsc")
    .notEmpty().withMessage("Card CSC is required")
    .isNumeric().isLength({min: 3, max:3}).withMessage("Invalid Card CSC"),
  createOrder);

router.get("/:orderId", getOrder);

router.get("/", getOrders);

export {router as orderRouter};
