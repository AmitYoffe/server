import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";

export class MovieService {
  constructor(
    private getAll: (searchQuery?: string) => Promise<Movie[]>,
    private create: (movie: Movie) => Promise<Movie>,
    private edit: (movie: MovieDto, id: number) => Promise<Movie>
  ) { }

  getAllMovies = async (searchQuery?: string): Promise<Movie[]> => {
    return this.getAll(searchQuery);
  }

  createMovie = async (movie: Movie): Promise<Movie> => {
    return this.create(movie);
  };

  editMovie = async (
    movie: MovieDto,
    id: number
  ): Promise<Movie> => {
    return this.edit(movie, id);
  };

  getMovieIds = async (): Promise<number[]> => {
    const movieList = await this.getAll();
    const moviesIdArr = movieList.map((movie) => movie.id);

    return moviesIdArr;
  };
}