import { Movie } from "./movieModel";

export interface Director {
  id: number;
  firstName: string;
  lastName: string;
  movies: Movie[];
}

// model is an object i use in a db but a dto is
// an object i use in request and when mobving data
