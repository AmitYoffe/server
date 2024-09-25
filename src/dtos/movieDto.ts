import { Movie } from "../models/movieModel";

export type movieDto = Omit<Movie, "id">;
