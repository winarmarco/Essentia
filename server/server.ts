import express from "express";
import next from "next";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { userRouter } from "./routes/User";
import { cartRouter } from "./routes/Cart";
import upload from "./utils/middleware/upload";
import { productRouter } from "./routes/Product";
import { categoryRouter } from "./routes/Category";
import { discountCouponeRouter } from "./routes/DiscountCoupon";
import { orderRouter } from "./routes/Order";
import * as dotenv from "dotenv";
import path from "path";
// const Note = require('./models/Note');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();



app.prepare().then(() => {
  dotenv.config({path: path.join(__dirname, "@/.env")});

  mongoose.connect('mongodb://localhost:27017/essentia');
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })


  const server = express();

  server.use(express.json()); // for parsing application/json
  server.use(express.urlencoded({
    extended: true
  }));


  server.use('/api/', userRouter);
  server.use('/api/cart', cartRouter);
  server.use('/api/products', productRouter);
  server.use('/api/category', categoryRouter);
  server.use('/api/discount-coupon', discountCouponeRouter);
  server.use('/api/order', orderRouter);

  server.all('*', (req: Request, res: Response) => {
    if (!req.path.match(/.\.(css|js|jpg|png)$/)) {
      console.log("served");
    }
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
}).catch((err: Error) => {
  console.log('Error:::::', err);
});

