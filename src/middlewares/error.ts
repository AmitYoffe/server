import { Response } from "express";

export default function errorHandler(err: any, res: Response) {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error !!!!";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
}
