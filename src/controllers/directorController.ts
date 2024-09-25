import { Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import validationErrorHandler from "../middlewares/validationErrorHandler";
import * as directorService from "../services/directorServices";
import { directorBaseValidator } from "../validations/directors/baseDirector";
import { directorEditValidator } from "../validations/directors/editDirector";

export const directorsRouter = Router();

directorsRouter.get("/", async (req: Request, res: Response) => {
  const searchQuery = req.query.search as string;
  const directors = await directorService.getAllDirectors(searchQuery);
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
  "/:id",
  checkSchema(directorEditValidator),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    validationErrorHandler(errors, res);

    // const existingDirector = await directorService.getDirectorById(
    //   updatedDirectorId
    // );

    // if (!existingDirector) {
    //   return res
    //     .status(404)
    //     .json({
    //       message: `Director with id of ${updatedDirectorId} not found`,
    //     });
    // }

    const updatedDirectorId = Number(req.params.id);
    const director = await directorService.editDirector(
      req.body,
      updatedDirectorId
    );
    res.status(201).json(director);
  }
);
