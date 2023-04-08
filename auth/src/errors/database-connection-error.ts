import CustomError from "./custom-error";

export default class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason = "Error connecting to database";
  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.reason }];
  }
}
