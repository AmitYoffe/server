import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error !!!!";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
}
