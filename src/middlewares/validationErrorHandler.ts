import { Response } from "express";
import { Result, ValidationError } from "express-validator";

export default function validationErrorHandler(
  errors: Result<ValidationError>,
  res: Response
) {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}
