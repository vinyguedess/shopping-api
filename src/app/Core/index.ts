import User from "./Models/User";
import AuthController from "./Controllers/AuthController";
import HomeController from "./Controllers/HomeController";


export default {
    initialize: () =>
    {
        loadControllers();
        loadModels();
        prepareEnvironment();
    }
}


const prepareEnvironment = () => Promise.all([
    User.findOne({ where: { user: "admin" } }).then(user =>
    {
        if (user) return user;

        return User.create({ name: "Administrador", user: "admin", pass: "admin@123" })
    })
])


const loadModels = () =>
{
    // User.sync({ alter: true });
}


const loadControllers = () => [
    new AuthController(),
    new HomeController()
]