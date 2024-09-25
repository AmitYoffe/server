import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";
import * as MovieRepository from "../repositories/movieRepository";

export async function getAllMovies(searchQuery?: string): Promise<Movie[]> {
  return MovieRepository.getAll(searchQuery);
}

export async function createMovie(movie: Movie): Promise<Movie> {
  return MovieRepository.create(movie);
}

// function takes 2 arguments seperately because id comes from URL
// and movieInfo comes from the body of the request
export async function editMovie(movie: MovieDto, id: number): Promise<Movie> {
  return MovieRepository.edit(movie, id);
}

// make everything arrow functions
