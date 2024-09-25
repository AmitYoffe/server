import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";
import * as MovieRepository from "../repositories/movieRepository";

export const getAllMovies = async (searchQuery?: string): Promise<Movie[]> => {
  return MovieRepository.getAll(searchQuery);
};

export const createMovie = async (movie: Movie): Promise<Movie> => {
  return MovieRepository.create(movie);
};

export const editMovie = async (
  movie: MovieDto,
  id: number
): Promise<Movie> => {
  return MovieRepository.edit(movie, id);
};

export const getMovieIds = async (): Promise<number[]> => {
  const movieList = MovieRepository.getAll();
  const moviesIdArr = movieList.map((movie) => movie.id);

  return moviesIdArr;
};
