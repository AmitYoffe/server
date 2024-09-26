import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as DirectorService from "../../services/directorServices";
import { StatusCodes } from "http-status-codes";

export const checkDirectorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const directorsIdArr = await DirectorService.getDirectorIds();
  const updatedDirectorId = Number(req.params.id);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }

  if (!directorsIdArr.includes(updatedDirectorId)) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `Director with id of ${updatedDirectorId} not found`,
    });
  }

  next();
};
