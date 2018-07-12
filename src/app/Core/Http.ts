import { resolve } from "url"
import { Router } from "express";
import { IMiddleware } from "./Interfaces/IMiddleware";


const router = Router();
export const get = (route: string, middlewares: Array<IMiddleware> = []) => (controller, action) =>
    router.get(
        resolve(controller.basePath || "/", route),
        ...middlewares.map(m => m.handle),
        controller[action]
    );


export const post = (route: string, middlewares: Array<IMiddleware> = []) => (controller, action) =>
    router.post(
        resolve(controller.basePath || "/", route),
        ...middlewares.map(m => m.handle),
        controller[action]
    )


export const register = app => app.use(router);