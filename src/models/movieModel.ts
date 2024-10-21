import { Director } from "./directorModel";

export type Movie = {
  id: number;
  title: string;
  director: Director | string;
  year: number;
}
