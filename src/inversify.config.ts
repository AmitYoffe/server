import { Container } from "inversify";
import { DirectorController, MovieController } from "./controllers";
import { DirectorRepository, MovieRepository } from "./repositories";
import { DirectorService, MovieService } from "./services";

const container = new Container();

container.bind(DirectorController).toSelf();
container.bind(DirectorService).toSelf();
container.bind(DirectorRepository).toSelf();
container.bind(MovieController).toSelf();
container.bind(MovieService).toSelf();
container.bind(MovieRepository).toSelf();

export default container;