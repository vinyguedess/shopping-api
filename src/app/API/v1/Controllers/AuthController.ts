import { post } from "../../../Core/Http";
import LoginService from "../Services/LoginService";
import AuthMiddleware from "../../../Core/Middlewares/AuthMiddleware";


export default class AuthController
{

    @post("/v1/auth/login")
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

    @post("/v1/auth/refresh", [new AuthMiddleware])
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