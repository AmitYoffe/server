import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import { DirectorRepository } from "../repositories/directorRepository";
import { Response } from "express";

@injectable()
export class DirectorService {
  constructor(
    @inject(DirectorRepository) private directorRepository: DirectorRepository
  ) { }

  getAllDirectors = async (searchQuery?: string): Promise<Director[]> => {
    return this.directorRepository.getAll(searchQuery);
  }

  createDirector = async (director: Director): Promise<Director> => {
    return this.directorRepository.create(director);
  }

  editDirector = async (
    director: DirectorDto,
    id: number,
    res: Response
  ): Promise<Director | Response<any>> => {
    const idValidationError = await this.checkDirectorId(id);

    if (idValidationError) {
      return res.status(idValidationError.status).json({
        message: idValidationError.message,
      });
    }
    return this.directorRepository.edit(director, id);
  }

  getDirectorIds = async (): Promise<number[]> => {
    const directorList = await this.directorRepository.getAll();
    return directorList.map((director) => director.id);
  }

  checkDirectorId = async (
    updatedDirectorId: number
  ) => {
    const directorsIdArr = await this.getDirectorIds();

    if (!directorsIdArr.includes(updatedDirectorId)) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: `Director with id of ${updatedDirectorId} not found`,
      };
    }

    return null;
  };
}

// rename all methods to generic names (( checkDirectorId => checkId )) and so on...