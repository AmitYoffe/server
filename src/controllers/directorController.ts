import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import * as directorService from "../services/directorServices";
import { directorBaseValidator } from "../validations/directors/baseDirector";
import { directorEditValidator } from "../validations/directors/editDirector";

export const directorsRouter = Router();

directorsRouter.get("/", async (req: Request, res: Response) => {
  const directors = await directorService.getAllDirectors();
  res.json(directors);
});

directorsRouter.post(
  "/",
  checkSchema(directorBaseValidator),
  async (req: Request, res: Response) => {
    // I am not sure if these 2 lines are even necessary:
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const director = await directorService.createDirector(req.body);
    res.status(201).json(director);
  }
);

directorsRouter.put(
  "/",
  checkSchema(directorEditValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const director = await directorService.editDirector(req.body);
    res.status(201).json(director);
  }
);
