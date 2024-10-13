import { Container } from "inversify";
import { DirectorController } from "./controllers/directorController";
import { MovieController } from "./controllers/movieController";
import { DirectorRepository } from "./repositories/directorRepository";
import { MovieRepository } from "./repositories/movieRepository";
import { DirectorService } from "./services/directorServices";
import { MovieService } from "./services/movieServices";

const container = new Container();

container.bind(DirectorController).toSelf();
container.bind(DirectorService).toSelf();
container.bind(DirectorRepository).toSelf();
container.bind(MovieController).toSelf();
container.bind(MovieService).toSelf();
container.bind(MovieRepository).toSelf();
// ? i don't understand what it does...

export default container;