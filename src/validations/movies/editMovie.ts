import { movieBaseValidator } from "./baseMovie";

export const movieEditValidator = {
  id: {
    notEmpty: {
      errorMessage: "ID can't be left empty",
    },
  },
  ...movieBaseValidator,
};

// add type (Movie)?
