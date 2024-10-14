import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import container from "../../inversify.config";
import { MovieService } from "../../services/movieServices";

export const checkMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const updatedMovieId = Number(req.params.id);

  const movieService = container.get(MovieService)
  const moviesIdArr = await movieService.getMovieIds();

  // error and validations shouldnt be here, only in middleware ection in expressApp
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

// todo: move this logic into service layer ( movies & directors )
