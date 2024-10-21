import fs from "fs";
import { injectable } from "inversify";
import path from "path";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";

@injectable()
export class DirectorRepository {
  // connection with db should be in .env
  private directorsFilePath = path.resolve("./database/directors.json");

  get = async (searchQuery?: string) => {
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

  create = async (directorInfo: DirectorDto) => {
    const directors = await this.get();
    let newId = 1;
    for (const existingDirector of directors) {
      if (existingDirector.id >= newId) {
        newId = existingDirector.id + 1;
      }
    }

    const newDirector = { id: newId, ...directorInfo };
    directors.push(newDirector);
    fs.writeFileSync(
      this.directorsFilePath,
      JSON.stringify(directors, null, 2),
      "utf-8"
    );

    return newDirector;
  }

  edit = async (updatedDirector: DirectorDto, id: number) => {
    const directors = await this.get();
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

  delete = async (id: number) => {
    const directors = await this.get();
    const updatedDirectors = directors.filter(director => director.id !== id);

    fs.writeFileSync(
      this.directorsFilePath,
      JSON.stringify(updatedDirectors, null, 2),
      "utf-8"
    );

    return directors;
  }
}
