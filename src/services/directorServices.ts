import { Director } from "../models/directorModel";
import * as DirectorRepository from "../repositories/directorRepository";

export async function getAllDirectors(): Promise<Director[]> {
  return DirectorRepository.getAll();
}

export async function createDirector(director: Director): Promise<Director> {
  return DirectorRepository.create(director);
}

export async function editDirector(director: Director): Promise<Director> {
  return DirectorRepository.edit(director);
}
