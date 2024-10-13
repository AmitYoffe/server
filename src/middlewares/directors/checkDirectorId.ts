import container from "../../inversify.config";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { DirectorService } from "../../services/directorServices";

export const checkDirectorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const updatedDirectorId = Number(req.params.id);

  const directorService = container.get(DirectorService)
  const directorsIdArr = await directorService.getDirectorIds();

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

// todo: move this logic into service layer ( movies & directors )
