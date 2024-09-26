import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as MovieService from "../../services/movieServices";

export const checkMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const moviesIdArr = await MovieService.getMovieIds();
  const updatedMovieId = Number(req.params.id);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(errors);
  }

  if (!moviesIdArr.includes(updatedMovieId)) {
    return res.status(404).json({
      message: `Movie with id of ${updatedMovieId} not found`,
    });
  }

  next();
};
