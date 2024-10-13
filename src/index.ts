import "reflect-metadata";
import container from "./inversify.config";

import { DirectorController, MovieController } from "./controllers";
import ExpressApp from "./expressApp";

// make sure the first 2 imports are these, maintain the order as it is:
// import "reflect-metadata";
// import container from "./inversify.config";

const directorController = container.get(DirectorController)
const movieController = container.get(MovieController)

const app = new ExpressApp(directorController, movieController);
app.listen();
