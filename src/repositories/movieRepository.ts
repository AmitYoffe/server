import fs from "fs";
import path from "path";
import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";

const moviesFilePath = path.resolve("./database/movies.json");

export function getAll(searchQuery?: string): Movie[] {
  const movies = fs.readFileSync(moviesFilePath, "utf-8");
  const movieList = JSON.parse(movies);

  if (searchQuery) {
    return movieList.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return movieList;
}

export function create(movieInfo: Movie): Movie {
  const movies = getAll();

  let newId = 1;
  for (const existingMovie of movies) {
    if (existingMovie.id >= newId) {
      newId = existingMovie.id + 1;
    }
  }

  const newMovie = { ...movieInfo, id: newId };
  movies.push(newMovie);
  fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), "utf-8");

  return newMovie;
}

export function edit(updatedMovie: MovieDto, id: number): Movie {
  const movies = getAll();
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
  fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2), "utf-8");
  
  return movies[movieIndex];
}

// export function deleteOne(movie: Movie): Movie { }
