import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as MovieService from "../../services/movieServices";
import { StatusCodes } from "http-status-codes";

export const checkMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const moviesIdArr = await MovieService.getMovieIds();
  const updatedMovieId = Number(req.params.id);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }

  if (!moviesIdArr.includes(updatedMovieId)) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Movie with id of ${updatedMovieId} not found`,
    });
  }

  next();
};
