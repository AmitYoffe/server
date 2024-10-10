// import { NextFunction, Request, Response, Router } from "express";
// import { Movie } from "../models/movieModel";

// export class MoviesRouter {
//   router: Router;

//   constructor(
//     // private loggerHandler: (req: Request, res: Response, next: NextFunction) => void,
//     // private getAllMovies: (searchQuery?: string) => Promise<Movie[]>,
//   ) {
//     this.router = Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.get("/:search?", this.loggerHandler, this.getMoviesHandler);
//     post 
//     patch
//   }

//   private getMoviesHandler = async (req: Request, res: Response) => {
//     const searchQuery = req.params.search;
//     const movies = await this.getAllMovies(searchQuery);
//     res.json(movies);
//   }


// }


// // turning the lower part into classes above























// // export const moviesRouter = Router();

// // moviesRouter.get("/:search?", loggerHandler, async (req: Request, res: Response) => {
// //   const searchQuery = req.params.search;
// //   const movies = await getAllMovies(searchQuery);
// //   res.json(movies);
// // });

// // moviesRouter.post(
// //   "/",
// //   loggerHandler,
// //   checkSchema(movieBaseValidator),
// //   async (req: Request, res: Response) => {
// //     const errors = validationResult(req);
// //     validationErrorHandler(errors, res);

// //     const movie = await createMovie(req.body);
// //     res.status(StatusCodes.CREATED).json(movie);
// //   }
// // );

// // moviesRouter.patch(
// //   "/:id",
// //   loggerHandler,
// //   checkSchema(movieEditValidator),
// //   checkMovieId,
// //   async (req: Request, res: Response) => {
// //     const updatedMovieId = Number(req.params.id);
// //     const movie = await editMovie(req.body, updatedMovieId);
// //     res.status(StatusCodes.CREATED).json(movie);
// //   }
// // );
