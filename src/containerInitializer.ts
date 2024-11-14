import { DirectorController, MovieController } from "./controllers";
import { ControllerType } from "./dtos/controllerDto";
import container from "./inversify.config";

export const containerInitializer = () => {
    const directorController = container.get(DirectorController);
    const movieController = container.get(MovieController);
    const controllerArr: ControllerType[] = [movieController, directorController];

    return controllerArr;
}