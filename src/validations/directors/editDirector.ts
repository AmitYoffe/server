import { Schema } from "express-validator";
import { directorBaseValidator } from "./baseDirector";

export const directorEditValidator: Schema = {
  id: {
    notEmpty: {
      errorMessage: "ID can't be left empty",
    },
  },
  ...directorBaseValidator,
};
