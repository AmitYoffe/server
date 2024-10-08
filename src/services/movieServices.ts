import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";
import { create, edit, getAll } from "../repositories/movieRepository";

export const getAllMovies = async (searchQuery?: string): Promise<Movie[]> => {
  return getAll(searchQuery);
};

export const createMovie = async (movie: Movie): Promise<Movie> => {
  return create(movie);
};

export const editMovie = async (
  movie: MovieDto,
  id: number
): Promise<Movie> => {
  return edit(movie, id);
};

export const getMovieIds = async (): Promise<number[]> => {
  const movieList = getAll();
  const moviesIdArr = movieList.map((movie) => movie.id);

  return moviesIdArr;
};
export function getDirectorIds() {
  throw new Error("Function not implemented.");
}

