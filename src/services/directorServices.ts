import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import { DirectorRepository } from "../repositories/directorRepository";

export class DirectorService {
  directorRepository = new DirectorRepository();

  getAllDirectors = async (searchQuery?: string): Promise<Director[]> => {
    return this.directorRepository.getAll(searchQuery);
  }

  createDirector = async (director: Director): Promise<Director> => {
    return this.directorRepository.create(director);
  }

  editDirector = async (
    director: DirectorDto,
    id: number
  ): Promise<Director> => {
    return this.directorRepository.edit(director, id);
  }

  getDirectorIds = async (): Promise<number[]> => {
    const directorList = await this.directorRepository.getAll();
    return directorList.map((director) => director.id);
  }
}