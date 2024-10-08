import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function errorHandler(err: any, res: Response) {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error !!!!";

  // if (err && err !== undefined && err !== null) {
  // There is always an err ??? !!!
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  // }
}
