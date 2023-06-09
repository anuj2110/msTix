import { ValidationError } from "express-validator";
import CustomError from "./custom-error";

export default class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid parameters passed");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
