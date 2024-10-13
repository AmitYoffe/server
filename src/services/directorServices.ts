import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";

export class DirectorService {
  constructor(
    private getAll: (searchQuery?: string) => Promise<Director[]>,
    private create: (director: Director) => Promise<Director>,
    private edit: (director: DirectorDto, id: number) => Promise<Director>
  ) {
    // this.getAll = getAll;
    // this.create = create;
    // this.edit = edit;
  }

  getAllDirectors = async (searchQuery?: string): Promise<Director[]> => {
    return this.getAll(searchQuery);
  }

  createDirector = async (director: Director): Promise<Director> => {
    return this.create(director);
  }

  editDirector = async (
    director: DirectorDto,
    id: number
  ): Promise<Director> => {
    return this.edit(director, id);
  }

  getDirectorIds = async (): Promise<number[]> => {
    const directorList = await this.getAll();
    return directorList.map((director) => director.id);
  }
}