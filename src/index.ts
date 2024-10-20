import "reflect-metadata";
import container from "./inversify.config";

import { DirectorController, MovieController } from "./controllers";
import ExpressApp from "./expressApp";

const directorController = container.get(DirectorController);
const movieController = container.get(MovieController);

// unnecessary dependancies because i am already injecting the calsses inside the ExpressaPP class
const app = new ExpressApp(directorController, movieController);
app.listen();
