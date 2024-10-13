import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { MovieService } from "../../services/movieServices";
import { StatusCodes } from "http-status-codes";
import { create, edit, getAll } from "../../repositories/movieRepository";

export const checkMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const updatedMovieId = Number(req.params.id);

  const movieService = new MovieService(getAll, create, edit);
  const moviesIdArr = await movieService.getMovieIds();

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

//Todo: maybe make this function reuseable by combining checkMovieId / checkDirectorId