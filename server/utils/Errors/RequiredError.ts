import { CustomError } from "./CustomError";

export class RequiredError extends CustomError {
  field: string;

  constructor(field: string, message: string, statusCode: number = 400) {
    super(JSON.stringify({field, message}), statusCode);
    this.field = field;
  }
}