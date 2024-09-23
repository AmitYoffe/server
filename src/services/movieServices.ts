import { Movie } from "../models/movieModel";
import * as MovieRepository from "../repositories/movieRepository";

export async function getAllMovies(): Promise<Movie[]> {
  return MovieRepository.getAll();
}

export async function createMovie(movie: Movie): Promise<Movie> {
  return MovieRepository.create(movie);
}

export async function editMovie(movie: Movie): Promise<Movie> {
  return MovieRepository.edit(movie);
}
