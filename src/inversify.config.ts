import { Container } from "inversify";
import { DirectorController } from "./controllers/directorController";
import { DirectorRepository } from "./repositories/directorRepository";
import { DirectorService } from "./services/directorServices";

const container = new Container();

container.bind(DirectorController).toSelf();
container.bind(DirectorService).toSelf();
container.bind(DirectorRepository).toSelf();
// ? i don't understand what it does...

export default container;