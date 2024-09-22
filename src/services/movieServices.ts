import { Movie } from "../models/movieModel";
import * as MovieRepository from "../repositories/movieRepository";

export async function getAllMovies(): Promise<Movie[]> {
  return MovieRepository.getAll();
}

// export async function createMovie(data: Movie): Promise<Movie> {
//   return MovieRepository.create(data);
// }
