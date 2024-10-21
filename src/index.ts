import "reflect-metadata";
import container from "./inversify.config";

import { DirectorController, MovieController } from "./controllers";
import ExpressApp from "./expressApp";

const directorController = container.get(DirectorController);
const movieController = container.get(MovieController);
const controllerArr = [movieController, directorController]

const app = new ExpressApp(controllerArr);
app.listen();
