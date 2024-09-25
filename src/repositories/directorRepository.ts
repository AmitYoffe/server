import fs from "fs";
import path from "path";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";

const directorsFilePath = path.resolve("./database/directors.json");

export function getAll(searchQuery?: string): Director[] {
  const directors = fs.readFileSync(directorsFilePath, "utf-8");
  const directorList = JSON.parse(directors);

  if (searchQuery) {
    return directorList.filter(
      (director: Director) =>
        director.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        director.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return directorList;
}

export function create(directorInfo: Director): Director {
  const directors = getAll();
  let newId = 1;
  for (const existingDirector of directors) {
    if (existingDirector.id >= newId) {
      newId = existingDirector.id + 1;
    }
  }

  const newDirector = { ...directorInfo, id: newId };
  directors.push(newDirector);
  fs.writeFileSync(
    directorsFilePath,
    JSON.stringify(directors, null, 2),
    "utf-8"
  );

  return newDirector;
}

export function edit(updatedDirector: DirectorDto, id: number): Director {
  const directors = getAll();
  const directorIndex = directors.findIndex((director) => director.id === id);
  directors[directorIndex] = {
    ...directors[directorIndex],
    ...updatedDirector,
  };
  fs.writeFileSync(
    directorsFilePath,
    JSON.stringify(directors, null, 2),
    "utf-8"
  );

  return directors[directorIndex];
}
