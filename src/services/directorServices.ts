import { inject, injectable } from "inversify";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import { DirectorRepository } from "../repositories/directorRepository";

@injectable()
export class DirectorService {
  constructor(
    @inject(DirectorRepository) private directorRepository: DirectorRepository
  ) { }

  async get(searchQuery?: string) { // unnecessary asyncs 
    return this.directorRepository.get(searchQuery);
  }

  async create(director: DirectorDto) {
    return this.directorRepository.create(director);
  }

  async edit(director: DirectorDto, id: number) {
    await this.checkId(id);
    return this.directorRepository.edit(director, id);
  }

  async getIds() {
    const directorList: Director[] = await this.directorRepository.get();
    return directorList.map((director) => director.id);
  }

  async checkId(updatedDirectorId: number) { // naming should be specific to its own logic and not to its use case ( id and not updatedDirectorId )
    const directorsIdArr = await this.getIds();

    if (!directorsIdArr.includes(updatedDirectorId)) {
      throw new Error(`Director with id of ${updatedDirectorId} not found`);
    }
  }

  async delete(id: number) {
    await this.checkId(id);
    await this.directorRepository.delete(id);
  }
}
