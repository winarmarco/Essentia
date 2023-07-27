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
dotenv.config({path: path.join(__dirname, "../.env")});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb://localhost:27017/essentia');
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.prepare().then(() => {
  const server = express();

  server.use(express.json()); // for parsing application/json
  server.use(express.urlencoded({
    extended: true
  }));


  // server.get('/api/notes', async (req, res) => {
  //   const notes = await Note.find();
  //   res.json(notes);
  // });

  // server.post('/api/notes', async (req, res) => {
  //   const newNote = new Note({
  //     title: req.body.title,
  //     content: req.body.content,
  //   });

  //   const savedNote = await newNote.save();
  //   res.json(savedNote);
  // });

  // server.post('/api/upload', upload.array("images"), async (req: Request, res: Response) => {
  //  try {
  //   if (!req.files) {
  //     res.status(400).send("No file uploaded");
  //     return;
  //   }
  //   const urls: string[] = [];

  //   for (const file of req.files as Express.Multer.File[]) {
  //     const result =  await cloudinary.v2.uploader.upload(file.path);
  //     urls.push(result.url);
  //   }

  //   console.log(urls);
  //   res.send("successfully");
  //  } catch (error) {
  //   console.log(error);
  //   res.send("error uploading image");
  //  }
  // })

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

