import { inject, injectable } from "inversify";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import { DirectorRepository } from "../repositories/directorRepository";

@injectable()
export class DirectorService {
  constructor(
    @inject(DirectorRepository) private directorRepository: DirectorRepository
  ) { }

  get(searchQuery?: string) {
    return this.directorRepository.get(searchQuery);
  }

  create(director: DirectorDto) {
    return this.directorRepository.create(director);
  }

  edit(director: DirectorDto, id: number) {
    this.checkId(id);
    return this.directorRepository.edit(director, id);
  }

  getIds() {
    const directorList: Director[] = this.directorRepository.get();
    return directorList.map((director) => director.id);
  }

  checkId(id: number) {
    const directorsIdArr = this.getIds();

    if (!directorsIdArr.includes(id)) {
      throw new Error(`Director with id of ${id} not found`);
    }
  }

  delete(id: number) {
    this.checkId(id);
    this.directorRepository.delete(id);
  }
}
