import { Router } from "express";

// caPITAL LETTER FOR TYPE
// This isnt a dto, just a type
export type controllerDto = {
    basePath: string,
    router: Router,
}