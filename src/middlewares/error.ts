import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// error type shouldnt be any
// arrow func
// and file name 
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error !!!!";

  // do no return message, its bam
  res.status(statusCode).json({
    status: "error",
    statusCode,
    // message,
  });
}
