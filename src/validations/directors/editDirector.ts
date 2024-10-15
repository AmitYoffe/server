import { Schema } from "express-validator";

export const directorEditValidator: Schema = {
  id: {
    notEmpty: {
      errorMessage: "ID can't be left empty !",
    },
  },
  firstName: {
    optional: true,
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
    optional: true,
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
    optional: true,
  },
};
