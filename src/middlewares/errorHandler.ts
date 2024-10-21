import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// error type shouldnt be any
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = "Internal Server Error !!!!";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
}

