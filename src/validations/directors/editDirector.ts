import { directorBaseValidator } from "./baseDirector";

export const directorEditValidator = {
  id: {
    notEmpty: {
      errorMessage: "ID can't be left empty",
    },
  },
  ...directorBaseValidator,
};
