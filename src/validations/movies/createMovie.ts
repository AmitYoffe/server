import { Schema } from "express-validator";

export const movieCreationValidator: Schema = {
  title: {
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
    notEmpty: {
      errorMessage: "Director can't be left empty",
    },
  },
  year: {
    notEmpty: {
      errorMessage: "Year can't be left empty",
    },
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
