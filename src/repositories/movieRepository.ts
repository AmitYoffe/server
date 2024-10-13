import fs from "fs";
import { injectable } from "inversify";
import path from "path";
import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";

@injectable()
export class MovieRepository {
  moviesFilePath = path.resolve("./database/movies.json");

  getAll = async (searchQuery?: string): Promise<Movie[]> => {
    const movies = fs.readFileSync(this.moviesFilePath, "utf-8");
    const movieList = JSON.parse(movies);

    if (searchQuery) {
      return movieList.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return movieList;
  };

  create = async (movieInfo: Movie): Promise<Movie> => {
    const movies = await this.getAll();

    let newId = 1;
    for (const existingMovie of movies) {
      if (existingMovie.id >= newId) {
        newId = existingMovie.id + 1;
      }
    }

    const newMovie = { ...movieInfo, id: newId };
    movies.push(newMovie);
    fs.writeFileSync(this.moviesFilePath, JSON.stringify(movies, null, 2), "utf-8");

    return newMovie;
  }

  edit = async (updatedMovie: MovieDto, id: number): Promise<Movie> => {
    const movies = await this.getAll();
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
    fs.writeFileSync(this.moviesFilePath, JSON.stringify(movies, null, 2), "utf-8");

    return movies[movieIndex];
  }
}
