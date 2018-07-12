import { IMiddleware } from "../Interfaces/IMiddleware";
import Authentication from "../Auth";


export default class AuthMiddleware implements IMiddleware
{

    handle(request, response, next)
    {
        return Authentication.authenticate()(request, response, next);
    }

}