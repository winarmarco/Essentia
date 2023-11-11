import {Router} from "express";
import {createOrder, getHistory, getOrder, getOrders, updateOrder} from "../controller/Order";
import { body } from "express-validator";
import { isAuth } from "../utils/middleware/Authentication";
import { isAdmin } from "../utils/middleware/Authorization";
import { validateId } from "../utils/middleware/ValidateId";
import Order, { OrderStatus } from "../model/Order";

const router = Router();

// Create new order
// Authorization: *
// method: POST
// path: /order
// body: {firstName: string, lastName: string, email: String, streetAddress: ShippingAddress, cardNumber: string, cardExpiry: string, cardCsc: string}
router.post("/", 
  isAuth,
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
  body("card.cardNumber") 
    .notEmpty().withMessage("Card Number is required")
    .isCreditCard().withMessage("Invalid Card Number"),
  body("card.expiryDate")
    .notEmpty().withMessage("Card Expiry is required")
    .matches(/\d{2}\/\d{2}/)
    .withMessage("Invalid Card Expiry")
    .custom((value) => {
      const [monthStr, yearStr] = value.split("/");
      const month = parseInt(monthStr, 10);
      const year = 2000 + parseInt(yearStr, 10);

      const expDate = new Date(year, month - 1);
      const currDate = new Date();

      if (expDate <= currDate) return Promise.reject("Expired Card")

      return Promise.resolve();
    }),
  body("card.CSC")
    .notEmpty().withMessage("Card CSC is required")
    .isNumeric().isLength({min: 3, max:3}).withMessage("Invalid Card CSC"),
  body("card.holder")
    .notEmpty().withMessage("Card Holder is required"),
createOrder);


router.get("/history", isAuth, getHistory);


// Get an order based on the given orderId
// Authorization: *
// method: GET
// path: /order/<orderId>
// body: -
router.get("/:orderId", isAuth, validateId({path: "params.orderId", model: Order}), getOrder);

// Get all customers' order
// Authorization: ADMIN
// method: GET
// path: /order
// body: -
router.get("/", isAuth, isAdmin, getOrders);


// Update an existing order
// method: PATCH
// path: /order/<orderId>
// Authorization: ADMIN
// body: {firstName: string, lastName: string, email: String, streetAddress: ShippingAddress, cardNumber: string, cardExpiry: string, cardCsc: string}
// return: {data: {order: Order[]}} - newly created order
router.patch("/:orderId", 
  isAuth, 
  isAdmin, 
  validateId({path: "params.orderId", model: Order}),
  body("firstName")
    .optional()
    .notEmpty().withMessage("First Name is required"),
  body("lastName")
    .optional()
    .notEmpty().withMessage("Last Name is required"),
  body("email")
    .optional().notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),
  body("shippingAddress.country")
    .optional()
    .notEmpty().withMessage("Country is required"),
  body("shippingAddress.streetAddress")
    .optional()
    .notEmpty().withMessage("Street Address is required"),
  body("shippingAddress.state")
    .optional()
    .notEmpty().withMessage("State is required"),
  body("shippingAddress.town")
    .optional()
    .notEmpty().withMessage("Town is required"),
  body("shippingAddress.zipCode")
    .optional()
    .notEmpty().withMessage("Zip Code is required")
    .isNumeric().isLength({min: 4, max: 6}).withMessage("Invalid zip code"),
  body("status")
    .optional()
    .notEmpty().withMessage("Order status is required")
    .custom(value => {
      if (!Object.values(OrderStatus).includes(value)) return Promise.reject(`Order status must be within ${Object.values(OrderStatus)}`);

      return Promise.resolve();
    }),
updateOrder);

export {router as orderRouter};
