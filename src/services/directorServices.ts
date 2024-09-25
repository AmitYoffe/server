import { directorDto } from "../dtos/directorDto";
import { Director } from "../models/directorModel";
import * as DirectorRepository from "../repositories/directorRepository";

export async function getAllDirectors(
  searchQuery?: string
): Promise<Director[]> {
  return DirectorRepository.getAll(searchQuery);
}

export async function createDirector(director: Director): Promise<Director> {
  return DirectorRepository.create(director);
}

export async function editDirector(
  director: directorDto,
  id: number
): Promise<Director> {
  return DirectorRepository.edit(director, id);
}

// export async function getDirectorById(updatedDirectorId: number) {
//   throw new Error("Function not implemented.");
// }
