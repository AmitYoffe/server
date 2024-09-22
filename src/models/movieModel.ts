import { Director } from "./directorModel";

export interface Movie {
  id: number;
  title: string;
  director: Director | string;
  year: number;
}
