import { Director } from "../models/directorModel";

export type directorDto = Omit<Director, "id">;
