import { Movie } from "./movieModel";

export interface Director {
  id: number;
  firstName: string;
  lastName: string;
  movies: Movie[];
}
