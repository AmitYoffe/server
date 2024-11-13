import { inject, injectable } from "inversify";
import { MovieDto } from "../dtos/movies/createMovieDto";
import { MovieRepository } from "../repositories/movieRepository";

@injectable()
export class MovieService {
  constructor(
    @inject(MovieRepository) private movieRepository: MovieRepository
  ) { }

  async get(searchQuery?: string) {
    return this.movieRepository.get(searchQuery);
  };

  async create(movie: MovieDto) {
    return this.movieRepository.create(movie);
  };

  async edit(
    movie: MovieDto,
    id: number
  ) {
    await this.checkId(id);
    return this.movieRepository.edit(movie, id);
  };

  async getIds() {
    const movieList = await this.movieRepository.get();
    const moviesIdArr = movieList.map((movie) => movie.id);

    return moviesIdArr;
  };

  async checkId(updatedMovieId: number) {
    const moviesIdArr = await this.getIds();

    if (!moviesIdArr.includes(updatedMovieId)) {
      throw new Error(`Director with id of ${updatedMovieId} not found`);
    }
  };

  async delete(id: number) {
    await this.checkId(id);
    await this.movieRepository.delete(id)
  }
}
