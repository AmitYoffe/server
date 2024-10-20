import { Director } from "../../models/directorModel";

// consistancy, use just types or just interfaces
export type DirectorDto = Omit<Director, "id">;
