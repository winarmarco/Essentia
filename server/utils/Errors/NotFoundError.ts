import { Error } from "mongoose";
import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  constructor(message: string, errorCode = 404) {
    super(message, errorCode);
  }
}