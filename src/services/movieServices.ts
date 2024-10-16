import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { MovieDto } from "../dtos/movies/createMovieDto";
import { Movie } from "../models/movieModel";
import { MovieRepository } from "../repositories/movieRepository";

@injectable()
export class MovieService {
  constructor(
    @inject(MovieRepository) private movieRepository: MovieRepository
  ) { }

  getAll = async (searchQuery?: string): Promise<Movie[]> => {
    return this.movieRepository.getAll(searchQuery);
  };

  create = async (movie: MovieDto): Promise<MovieDto> => {
    return this.movieRepository.create(movie);
  };

  edit = async (
    movie: MovieDto,
    id: number,
    res: Response
  ): Promise<Movie | Response<any>> => {
    const idValidationError = await this.checkId(id);

    if (idValidationError) {
      return res.status(idValidationError.status).json({
        message: idValidationError.message,
      });
    }

    return this.movieRepository.edit(movie, id);
  };

  getIds = async (): Promise<number[]> => {
    const movieList = await this.movieRepository.getAll();
    const moviesIdArr = movieList.map((movie) => movie.id);

    return moviesIdArr;
  };

  checkId = async (updatedMovieId: number) => {
    const moviesIdArr = await this.getIds();

    if (!moviesIdArr.includes(updatedMovieId)) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: `Movie with id of ${updatedMovieId} not found`,
      };
    }

    return null;
  };

  delete = async (id: number, res: Response) => {
    const idValidationError = await this.checkId(id);
    if (idValidationError) {
      res.status(idValidationError.status).json({
        message: idValidationError.message,
      })
      return false;
      ;
    }

    await this.movieRepository.delete(id)
    return true;
  }
}
