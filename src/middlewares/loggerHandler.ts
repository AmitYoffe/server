import { NextFunction, Request, Response } from "express";
import { LogDto } from "../dtos/logDto";

export const loggerHandler = (req: Request, res: Response, next: NextFunction) => {
    const currentTime = new Date();

    const log: LogDto = {
        path: req.originalUrl,
        time: currentTime.toLocaleString(),
        method: req.method,
        status: res.statusCode,
        body: req.body,
    }

    console.log(log);
    next();
}
