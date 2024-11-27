import fs from "fs";
import { injectable } from "inversify";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";

@injectable()
export class DirectorRepository {
  private directorsFilePath: string;

  constructor() {
    this.directorsFilePath = process.env.DB_CONNECTION_DIRECTORS as string
  }

  get(searchQuery?: string) {
    const directors = fs.readFileSync(this.directorsFilePath, "utf-8");
    const directorList: Director[] = JSON.parse(directors);

    if (searchQuery) {
      return directorList.filter(
        (director: Director) =>
          director.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          director.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return directorList;
  }

  create(directorInfo: DirectorDto) {
    const directors = this.get();

    let newId = directors.reduce((maxId, existingDirector) => {
      return Math.max(maxId, existingDirector.id + 1);
    }, 1);

    const newDirector = { id: newId, ...directorInfo };
    directors.push(newDirector);
    fs.writeFileSync(
      this.directorsFilePath,
      JSON.stringify(directors, null, 2),
      "utf-8"
    );

    return newDirector;
  }

  edit(updatedDirector: DirectorDto, id: number) {
    const directors = this.get();
    const directorIndex = directors.findIndex((director) => director.id === id);
    directors[directorIndex] = {
      ...directors[directorIndex],
      ...updatedDirector,
    };
    fs.writeFileSync(
      this.directorsFilePath,
      JSON.stringify(directors, null, 2),
      "utf-8"
    );

    return directors[directorIndex];
  }

  delete(id: number) {
    const directors = this.get();
    const updatedDirectors = directors.filter(director => director.id !== id);

    fs.writeFileSync(
      this.directorsFilePath,
      JSON.stringify(updatedDirectors, null, 2),
      "utf-8"
    );

    return directors;
  }
}
