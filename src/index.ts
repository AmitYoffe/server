import "reflect-metadata";
import container from "./inversify.config";
import { DirectorController } from "./controllers/directorController";
import ExpressApp from "./expressApp";
import { MovieController } from "./controllers/movieController";

const directorController = container.get(DirectorController)
const movieController = container.get(MovieController)

const app = new ExpressApp(directorController, movieController);
app.listen();
