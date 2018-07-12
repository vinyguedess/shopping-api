import { post } from "../Http";
import LoginService from "../Services/LoginService";
import AuthMiddleware from "../Middlewares/AuthMiddleware";


export default class AuthController
{

    @post("/auth/login")
    loginAction(request, response)
    {
        const { user, pass } = request.body;

        let loginService = new LoginService();
        return loginService.do(user, pass)
            .then(tokens =>
            {
                if (!tokens)
                    return response.status(403).json({
                        errors: loginService.getErrors()
                    });

                return response.json(tokens);
            });
    }

    @post("/auth/refresh", [new AuthMiddleware])
    refreshTokenAction(request, response)
    {
        const loginService = new LoginService();
        return loginService.refresh(request.body.refresh_token)
            .then(tokens =>
            {
                if (!tokens)
                    return response.status(403).json({
                        errors: loginService.getErrors()
                    });

                return response.json(tokens);
            });
    }

}