import HomeController from "./Controllers/HomeController";
import AuthController from "./Controllers/AuthController";
import UsersController from "./Controllers/UsersController";
import User from "./Models/User";


export default {
    initialize: () =>
    {
        loadModels();
        loadControllers();
        prepareEnvironment();
    }
}


const prepareEnvironment = () =>
{
    return Promise.all([
        User.findOne({ where: { user: "admin" } })
            .then(user =>
            {
                if (user)
                    return user;

                return User.create({ name: "Administrator", user: "admin", pass: "pass@123" })
            })
    ])
}


const loadModels = () =>
{
    // User.sync({ alter: true });
}


const loadControllers = () => [
    new HomeController(),
    new AuthController(),
    new UsersController()
];