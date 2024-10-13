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

// logic fix:
// the base validation schema is used for creation and patching, so in creation all fields are mandatory, in patching none are.
// so i need to somehow remove the 'notEmpty' option of the base schema when using it in the edit schema.
// or just make another one