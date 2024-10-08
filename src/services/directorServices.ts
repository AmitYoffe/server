import { DirectorDto } from "../dtos/directors/createDirectorDto";
import { Director } from "../models/directorModel";
import { create, edit, getAll } from "../repositories/directorRepository";

export const getAllDirectors = async (
  searchQuery?: string
): Promise<Director[]> => {
  return getAll(searchQuery);
};

export const createDirector = async (director: Director): Promise<Director> => {
  return create(director);
};

export const editDirector = async (
  director: DirectorDto,
  id: number
): Promise<Director> => {
  return edit(director, id);
};

export const getDirectorIds = async (): Promise<number[]> => {
  const directorList = getAll();
  const directorsIdArr = directorList.map((director) => director.id);

  return directorsIdArr;
};
