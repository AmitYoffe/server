import { Movie } from "./movieModel";

export type Director = {
  id: number;
  firstName: string;
  lastName: string;
  movies: Movie[];
}
