import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { checkDirectorId } from "../middlewares/directors/checkDirectorId";
import loggerHandler from "../middlewares/loggerHandler";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import { createDirector, editDirector, getAllDirectors } from "../services/directorServices";
import { directorBaseValidator } from "../validations/directors/baseDirector";
import { directorEditValidator } from "../validations/directors/editDirector";

export const directorsRouter = Router();

directorsRouter.get("/:search?", loggerHandler, async (req: Request, res: Response) => {
  const searchQuery = req.params.search;
  const directors = await getAllDirectors(searchQuery);
  res.json(directors);
});

directorsRouter.post(
  "/",
  loggerHandler,
  checkSchema(directorBaseValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    const director = await createDirector(req.body);
    res.status(StatusCodes.CREATED).json(director);
  }
);

directorsRouter.patch(
  "/:id",
  loggerHandler,
  checkSchema(directorEditValidator),
  checkDirectorId,
  async (req: Request, res: Response) => {
    const updatedDirectorId = Number(req.params.id);
    const director = await editDirector(
      req.body,
      updatedDirectorId
    );

    res.status(StatusCodes.PARTIAL_CONTENT).json(director);
  }
);
