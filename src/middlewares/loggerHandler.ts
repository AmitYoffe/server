import { NextFunction, Request, Response } from "express";
import { LogDto } from "../dtos/logDto";

const loggerHandler = (req: Request, res: Response, next: NextFunction) => {
    const currentTime = new Date();

    let log: LogDto = {
        path: req.path,
        time: currentTime.toLocaleString(),
        method: req.method,
        status: res.statusCode,
        body: req.body,
    }

    console.log(log);
    next();
}

export default loggerHandler;