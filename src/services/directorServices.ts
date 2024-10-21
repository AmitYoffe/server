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

  async get(searchQuery?: string) { this.directorRepository.get(searchQuery) };

  async create(director: DirectorDto) { this.directorRepository.create(director) };

  async edit(
    director: DirectorDto,
    id: number,
    res: Response
  ) {
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

  async getIds() {
    const directorList: Director[] = await this.directorRepository.get();
    const directorIdArr = directorList.map((director) => director.id);

    return directorIdArr;
  };

  // this method can just return a boolean value and retuirn the messages in each method
  async checkId(updatedDirectorId: number) {
    const directorsIdArr = await this.getIds();

    if (!directorsIdArr.includes(updatedDirectorId)) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: `Director with id of ${updatedDirectorId} not found`,
      };
    }
  };

  // same error exception logic should be here, shouldn't reuse thhe validation logic 
  async delete(id: number, res: Response) {
    const idValidationError = await this.checkId(id);
    if (idValidationError) {
      res.status(idValidationError.status).json({
        message: idValidationError.message,
      })
      return false;
    }

    await this.directorRepository.delete(id)
    return true;
  }
}
