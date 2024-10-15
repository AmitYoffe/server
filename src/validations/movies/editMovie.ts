import { Schema } from "express-validator";

export const movieEditValidator: Schema = {
  id: {
    notEmpty: {
      errorMessage: "ID can't be left empty",
    },
  },
  title: {
    optional: true,
    isLength: {
      options: { min: 2 },
      errorMessage: "Title should be at least 2 chars",
    },
    matches: {
      options: /^[a-z][a-z0-9\s]*$/i,
      errorMessage:
        "Title must start with a letter and contain only alphabetic or numeric chars.",
    },
  },
  director: {
    optional: true,
  },
  year: {
    optional: true,
    isNumeric: {
      errorMessage: "Year must be a number",
    },
    isInt: {
      options: {
        min: 1888,
        max: new Date().getFullYear(),
      },
      errorMessage: `Year must be an integer between 1888 and ${new Date().getFullYear()}.`,
    },
  },
};
