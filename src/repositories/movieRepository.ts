import fs from "fs";
import path from "path";
import { Movie } from "../models/movieModel";

const moviesFilePath = path.resolve("./database/movies.json");
const movies = fs.readFileSync(moviesFilePath, "utf-8");

export function getAll(): Movie[] {
  return JSON.parse(movies);
}

// export function create(data: Movie): Movie {
//   movies.push(data);
//   return data;
// }
// "C:\Users\idoaz\OneDrive\Desktop\MoviesHafifa\server\src\database\movies.json"
