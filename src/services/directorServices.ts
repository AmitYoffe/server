import { Director } from "../models/directorModel";
import * as DirectorRepository from "../repositories/directorRepository";

export async function getAllDirectors(): Promise<Director[]> {
  return DirectorRepository.getAll();
}

// export async function createDirector(data: Director): Promise<Director> {
//   return DirectorRepository.create(data);
// }
