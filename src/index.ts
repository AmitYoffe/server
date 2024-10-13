import "reflect-metadata";
import container from "./inversify.config";
import { DirectorController } from "./controllers/directorController";
import ExpressApp from "./expressApp";

// MovieController

const directorController = container.get(DirectorController)

const app = new ExpressApp(directorController);
app.listen();
