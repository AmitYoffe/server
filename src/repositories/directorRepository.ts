import fs from "fs";
import { Director } from "../models/directorModel";
import path from "path";

const directorsFilePath = path.resolve("./database/directors.json");
const directors = fs.readFileSync(directorsFilePath, "utf-8");

export function getAll(): Director[] {
  return JSON.parse(directors);
}

// export function create(data: Director): Director {
//   directors.push(data);
//   fs.writeFileSync(directorsFilePath, JSON.stringify(directors, null, 2));
//   return data;
// }
