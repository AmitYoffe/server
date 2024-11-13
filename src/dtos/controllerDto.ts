import { Router } from "express";

export type ControllerType = {
    basePath: string,
    router: Router,
}