import fs from "fs";
import { Director } from "../models/directorModel";
import path from "path";

const directorsFilePath = path.resolve("./database/directors.json");

export function getAll(): Director[] {
  const directors = fs.readFileSync(directorsFilePath, "utf-8");
  return JSON.parse(directors);
}

export function create(director: Director): Director {
  const directors = getAll();
  directors.push(director);
  fs.writeFileSync(
    directorsFilePath,
    JSON.stringify(directors, null, 2),
    "utf-8"
  );
  return director;
}

export function edit(updatedDirector: Director): Director {
  const directors = getAll();
  const directorIndex = directors.findIndex(
    (director) => director.id === updatedDirector.id
  );
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
