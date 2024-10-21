import dotenv from "dotenv";
import fs from "fs";
import { injectable } from "inversify";
import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";

@injectable()
export class MovieRepository {
  private moviesFilePath: string;

  constructor() {
    dotenv.config();
    this.moviesFilePath = process.env.DB_CONNECTION_MOVIES as string
  }

  get = async (searchQuery?: string) => {
    const movies = fs.readFileSync(this.moviesFilePath, "utf-8");
    const movieList: Movie[] = JSON.parse(movies);

    if (searchQuery) {
      return movieList.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return movieList;
  };

  create = async (movieInfo: MovieDto) => {
    const movies = await this.get();

    let newId = 1;
    for (const existingMovie of movies) {
      if (existingMovie.id >= newId) {
        newId = existingMovie.id + 1;
      }
    }

    const newMovie = { id: newId, ...movieInfo };
    movies.push(newMovie);
    fs.writeFileSync(
      this.moviesFilePath,
      JSON.stringify(movies, null, 2),
      "utf-8"
    );

    return newMovie;
  };

  edit = async (updatedMovie: MovieDto, id: number) => {
    const movies = await this.get();
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    movies[movieIndex] = { ...movies[movieIndex], ...updatedMovie };
    fs.writeFileSync(
      this.moviesFilePath,
      JSON.stringify(movies, null, 2),
      "utf-8"
    );

    return movies[movieIndex];
  };

  delete = async (id: number) => {
    const movices = await this.get();
    const updatedMovies = movices.filter(movie => movie.id !== id);

    fs.writeFileSync(
      this.moviesFilePath,
      JSON.stringify(updatedMovies, null, 2),
      "utf-8"
    );

    return movices;
  }
}
