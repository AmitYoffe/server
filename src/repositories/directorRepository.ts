import fs from "fs";
import path from "path";
import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";

const directorsFilePath = path.resolve("./database/directors.json");

export const getAll = async (searchQuery?: string): Promise<Director[]> => {
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
};

export const create = async (directorInfo: Director): Promise<Director> => {
  const directors = await getAll();
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
};

export const edit = async (updatedDirector: DirectorDto, id: number): Promise<Director> => {
  const directors = await getAll();
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
};
