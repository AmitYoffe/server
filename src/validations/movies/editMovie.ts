import { Schema } from "express-validator";
import { movieBaseValidator } from "./baseMovie";

export const movieEditValidator: Schema = {
  id: {
    notEmpty: {
      errorMessage: "ID can't be left empty",
    },
  },
  ...movieBaseValidator,
};
