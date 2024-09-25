import { Schema } from "express-validator";

export const directorBaseValidator: Schema = {
  firstName: {
    isLength: {
      options: { min: 2 },
      errorMessage: "First name should be at least 2 chars",
    },
    matches: {
      options: /^[a-z ,.'-]+$/i,
      errorMessage:
        "First name must start with a letter and contain only alphabetic or numeric chars.",
    },
  },
  lastName: {
    isLength: {
      options: { min: 2 },
      errorMessage: "First name should be at least 2 chars",
    },
    matches: {
      options: /^[a-z ,.'-]+$/i,
      errorMessage:
        "First name must start with a letter and contain only alphabetic or numeric chars.",
    },
  },
  movies: {
    notEmpty: {
      errorMessage: "movies array can't be left empty",
    },
  },
};
