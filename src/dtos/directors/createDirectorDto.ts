import { Director } from "../../models/directorModel";

export type DirectorDto = Omit<Director, "id">;
