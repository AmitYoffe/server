import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
  status?: number;
  statusCode?: number;
  message: string;
}

export const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message,
  });
}

