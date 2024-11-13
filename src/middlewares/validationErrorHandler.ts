import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  }

  next();
};
