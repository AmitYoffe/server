import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import { DirectorRepository } from "../repositories/directorRepository";

@injectable()
export class DirectorService {
  constructor(
    @inject(DirectorRepository) private directorRepository: DirectorRepository
  ) { }

  getAll = async (searchQuery?: string): Promise<Director[]> => {
    return this.directorRepository.getAll(searchQuery);
  };

  create = async (director: DirectorDto): Promise<DirectorDto> => {
    return this.directorRepository.create(director);
  };

  edit = async (
    director: DirectorDto,
    id: number,
    res: Response
  ): Promise<Director | Response<any>> => {
    const idValidationError = await this.checkId(id);

    if (idValidationError) {
      return res.status(idValidationError.status).json({
        message: idValidationError.message,
      });
    }

    return this.directorRepository.edit(director, id);
  };

  getIds = async (): Promise<number[]> => {
    const directorList = await this.directorRepository.getAll();
    const directorIdArr = directorList.map((director) => director.id);

    return directorIdArr;
  };

  checkId = async (updatedDirectorId: number) => {
    const directorsIdArr = await this.getIds();

    if (!directorsIdArr.includes(updatedDirectorId)) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: `Director with id of ${updatedDirectorId} not found`,
      };
    }

    return null;
  };

  delete = async (id: number) => {
    const idExists = this.checkId(id) // return boolean value
    if (!idExists) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: `Director with id of ${id} not found`,
      };
    } // do i really need this logic again if it's occuring in checkId?
    
    this.directorRepository.delete(id)
  }
}
