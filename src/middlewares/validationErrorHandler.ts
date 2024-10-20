import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // move the checkschema here, take the schema itself through an argument here 
  // (This didnt work for me...)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  if (req.method === "PATCH") {
    const idParam = req.params.id;
    if (idParam === undefined || idParam.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "ID param in URL is required for patching.",
          },
        ],
      });
    }

    // this logic is unnecessary because i can validate path params too
    const id = Number(idParam);
    if (isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "Invalid ID param. ID must be a number.",
            value: id,
          },
        ],
      });
    }
  }

  next();
};
