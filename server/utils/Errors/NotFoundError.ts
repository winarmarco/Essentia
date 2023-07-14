import { Error } from "mongoose";
import { MongooseError } from "./MongooseError";

export class NotFoundError extends MongooseError {
  constructor(message: string, errorCode = 404) {
    super(message, errorCode);
  }
}