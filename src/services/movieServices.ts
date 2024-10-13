import { inject, injectable } from "inversify";
import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";
import { MovieRepository } from "../repositories/movieRepository";

@injectable()
export class MovieService {
  constructor(
    @inject(MovieRepository) private movieRepository: MovieRepository
  ) { }

  getAllMovies = async (searchQuery?: string): Promise<Movie[]> => {
    return this.movieRepository.getAll(searchQuery);
  }

  createMovie = async (movie: Movie): Promise<Movie> => {
    return this.movieRepository.create(movie);
  };

  editMovie = async (
    movie: MovieDto,
    id: number
  ): Promise<Movie> => {
    return this.movieRepository.edit(movie, id);
  };

  getMovieIds = async (): Promise<number[]> => {
    const movieList = await this.movieRepository.getAll();
    const moviesIdArr = movieList.map((movie) => movie.id);

    return moviesIdArr;
  };

  checkMovieId = async () => {
    // 
  }
}