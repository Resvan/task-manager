import { ValidationError } from "express-validator";
import { CustomError } from "./customError";


export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Error request fields');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.type }
        })
    }
}