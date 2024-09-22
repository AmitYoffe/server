import { Request, Response, Router } from "express";
import * as directorService from "../services/directorServices";

export const directorsRouter = Router();

directorsRouter.get("/", async (req: Request, res: Response) => {
  const directors = await directorService.getAllDirectors();
  res.json(directors);
});

// directorsRouter.post("/", async (req: Request, res: Response) => {
//   const director = await directorService.createDirector(req.body);
//   res.status(201).json(director);
// });
