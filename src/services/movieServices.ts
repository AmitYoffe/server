import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";
import * as MovieRepository from "../repositories/movieRepository";

export const getAllMovies = async (searchQuery?: string): Promise<Movie[]> => {
  return MovieRepository.getAll(searchQuery);
};

export const createMovie = async (movie: Movie): Promise<Movie> => {
  return MovieRepository.create(movie);
};

// function takes 2 arguments seperately because id comes from URL
// and movieInfo comes from the body of the request
export const editMovie = async (
  movie: MovieDto,
  id: number
): Promise<Movie> => {
  return MovieRepository.edit(movie, id);
};

