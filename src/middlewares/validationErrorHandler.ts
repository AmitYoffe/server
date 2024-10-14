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

  // validation for url doesn't work...
  const validSearchParam = /^[a-zA-Z0-9]*$/;
  if (req.method === "GET" && req.params.search) {
    const searchQuery = req.params.search;
    console.log(`Search Query: ${searchQuery}`);
    if (!validSearchParam.test(searchQuery)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: "Invalid search query. Only numbers and strings are allowed.",
            value: searchQuery,
          },
        ],
      });
    }
  }

  next();
  // should i add some validation for the url params as well?
};
