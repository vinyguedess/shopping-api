import * as Passport from "passport";
import * as PassportJWT from "passport-jwt";
import jwt from "./../../config/jwt";
import User from "../API/v1/Models/User";


export default class Authentication
{

    private static auth;
    private static params = {
        secretOrKey: jwt.secret,
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    public static build()
    {
        const strategy = new PassportJWT.Strategy(this.params, (payload, done): void =>
        {
            User.findById(payload.id).then(user =>
            {
                if (!user)
                    return done(new Error("User not found"));

                return done(null, payload);
            });
        });

        this.auth = Passport.use(strategy);

        return this.initialize();
    }

    public static authenticate()
    {
        return this.auth.authenticate("jwt", jwt.session);
    }

    private static initialize()
    {
        return this.auth.initialize();
    }

};