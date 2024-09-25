import { Movie } from "../../models/movieModel";

export type MovieDto = Omit<Movie, "id">;
