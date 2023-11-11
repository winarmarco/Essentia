import { Error } from "mongoose";

export class CustomError extends Error {
  errorCode: number;
  details: any | any[];

  constructor(message: string, errorCode: number, details? : any | any[]) {
    super(message);
    this.errorCode = errorCode;
    this.details = details;
  }
}
