import express from "express";
import next from "next";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { userRouter } from "./routes/User";
// const Note = require('./models/Note');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb://localhost:27017/essentia');

app.prepare().then(() => {
  const server = express();

  server.use(express.json()); // for parsing application/json

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

  server.use('/api/', userRouter);

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

