import fs from "fs";
import path from "path";
import { Movie } from "../models/movieModel";

const moviesFilePath = path.resolve("./database/movies.json");

export function getAll(): Movie[] {
  const movies = fs.readFileSync(moviesFilePath, "utf-8");
  return JSON.parse(movies);
}

export function create(movie: Movie): Movie {
  const movies = getAll();
  movies.push(movie);
  fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), "utf-8");
  return movie;
}

export function edit(updatedMovie: Movie): Movie {
  const movies = getAll();
  const movieIndex = movies.findIndex((movie) => movie.id === updatedMovie.id);
  movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
  fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), "utf-8");
  return movies[movieIndex];
}

// export function deleteOne(movie: Movie): Movie { }
