import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// I need to find how to reuse this section throughout the other validators
// the validation middleware itself :

// (req: Request, res: Response, next: NextFunction) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       return res.status(400).send({ errors: result.array() });
//     }
//     next();
//   },

export const movieCreationValidator = [
  // If there is no "id" in the request body i send, it should fail.

  // Validation itself
  body("id").notEmpty().escape(),
  // middleware 
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    next();
  },
];

// export const movieEditorValidator = [
//   // body("id").notEmpty().escape(),
//   // check if schema is correct
//   (req: Request, res: Response, next: NextFunction) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       return res.status(400).send({ errors: result.array() });
//     }
//     next();
//   },
// ];
