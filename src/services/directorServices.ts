import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import * as DirectorRepository from "../repositories/directorRepository";

export const getAllDirectors = async (
  searchQuery?: string
): Promise<Director[]> => {
  return DirectorRepository.getAll(searchQuery);
};

export const createDirector = async (director: Director): Promise<Director> => {
  return DirectorRepository.create(director);
};

export const editDirector = async (
  director: DirectorDto,
  id: number
): Promise<Director> => {
  return DirectorRepository.edit(director, id);
};

// export async function getDirectorById(updatedDirectorId: number) {
//   throw new Error("Funtcion not implemented.");
// }
