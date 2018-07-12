import { get } from "../../../Core/Http";
import User from "../Models/User";


export default class UsersController
{

    @get("/v1/users")
    indexAction(requuest, response)
    {
        return User.findAll().then(users =>
        {
            response.json(users);
        });
    }

}