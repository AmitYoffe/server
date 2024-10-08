import { Request, Response } from "express";
import { LogDto } from "../dtos/logDto";

const loggerHandler = (req: Request, res: Response) => {
    const currentTime = new Date();

    let log: LogDto = {
        path: req.originalUrl,
        time: currentTime.toLocaleString(),
        method: req.method,
        status: res.statusCode,
        body: req.body,
    }

    // if (req.path !== '/favicon.ico') {
    console.log(log);
    // }
}

export default loggerHandler;