import { Response } from "express";
import { Result, ValidationError } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function validationErrorHandler(
  errors: Result<ValidationError>,
  res: Response
) {
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: errors.array() });
  }
}
