import express, { NextFunction, Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { userRouter } from "./routes/User";
import { cartRouter } from "./routes/Cart";
import { productRouter } from "./routes/Product";
import { categoryRouter } from "./routes/Category";
import { discountCouponeRouter } from "./routes/DiscountCoupon";
import { orderRouter } from "./routes/Order";
import { CustomError } from "./utils/Errors/CustomError";
import { isJsonString } from "./utils/helperFunctions/CheckJSON";
import cors from "cors";
import { invoiceRouter } from "./routes/Invoice";


dotenv.config();
const dev = process.env.NODE_ENV !== 'production';

mongoose.connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017/essentia").then(() => {
  console.log("> Successfully connected to database")
}).catch((error) => {
  console.log(error);
});
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


const server = express();

server.use(express.json()); // for parsing application/json
server.use(express.urlencoded({
  extended: true,
}));
server.use(cors<Request>());


server.use('/', userRouter);
server.use('/cart', cartRouter);
server.use('/products', productRouter);
server.use('/category', categoryRouter);
server.use('/invoice', invoiceRouter);
server.use('/discount-coupon', discountCouponeRouter);
server.use('/order', orderRouter);

server.use((error: MongooseError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    const errorCode = (error as CustomError).errorCode;
    const errorMessage = (error as CustomError).message;
    const errorData = (error as CustomError).details;
    
    return res.status(errorCode).json({message: errorMessage, details: errorData});
  }

  return res.status(500).json({error: error.message});
})

server.listen(process.env.PORT, () => {
  console.log(`> Ready on http://localhost:${process.env.PORT}`);
});

