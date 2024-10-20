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

  // get all should just be get
  // not necessarily need return typing here
  getAll = async (searchQuery?: string): Promise<Director[]> => this.directorRepository.getAll(searchQuery);

  create = async (director: DirectorDto): Promise<DirectorDto> => this.directorRepository.create(director);

  edit = async (
    director: DirectorDto,
    id: number,
    res: Response
  ): Promise<Director | Response> => {
    const idValidationError = await this.checkId(id);
    // change to excepetion throwing logic i.e. if (err) throw new error
    // because i already have this logic in my validation middleware
    if (idValidationError) {
      return res.status(idValidationError.status).json({
        message: idValidationError.message,
      });
    }

    return this.directorRepository.edit(director, id);
  };

  // do not need return types
  getIds = async (): Promise<number[]> => {
    const directorList = await this.directorRepository.getAll();
    const directorIdArr = directorList.map((director) => director.id);

    return directorIdArr;
  };

  // maybe i needed to make this a regular fuction to not use the .bind() 
  // in general do not use arrow fuinctions in classes instead of methods

  // this method can just return a boolean value and retuirn the messages in each method
  checkId = async (updatedDirectorId: number) => {
    const directorsIdArr = await this.getIds();

    if (!directorsIdArr.includes(updatedDirectorId)) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: `Director with id of ${updatedDirectorId} not found`,
      };
    }

    // returning null isnt neccessary
    return null;
  };

  // same error exception logic should be here, shouldn't reuse thhe validation logic 
  delete = async (id: number, res: Response) => {
    const idValidationError = await this.checkId(id);
    if (idValidationError) {
      res.status(idValidationError.status).json({
        message: idValidationError.message,
      })
      return false;
      ;
    }

    await this.directorRepository.delete(id)
    return true;
  }
}
