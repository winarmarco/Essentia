import { Error } from "mongoose";

export class MongooseError extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
  }
}
