import * as crypto from "crypto";
import * as JWT from "jsonwebtoken";
import jwt from "../../../../config/jwt";
import BaseService from "../../../Core/BaseService";
import { IToken } from "../Interfaces/IToken";
import User from "../Models/User";


export default class LoginService extends BaseService
{

    public do(user: string, pass: string): Promise<IToken | boolean>
    {
        pass = crypto.createHash("md5").update(pass).digest("hex");
        return User.findOne({
            where: { user, pass }
        }).then(user =>
        {
            if (!user)
            {
                this.addError("auth", "User and/or password may be wrong");
                return false;
            }

            return this.generate({
                id: user.id,
                name: user.name,
                user: user.user
            });
        });
    }

    public refresh(refreshToken: string)
    {
        return new Promise(resolve =>
            JWT.verify(refreshToken, jwt.secret, (err, payload) =>
            {
                if (err)
                {
                    this.addError("jwt", err.message);
                    resolve(false);
                }

                if (!payload.refresh)
                {
                    this.addError("auth", "This is not a valid refresh token");
                    resolve(false);
                }

                resolve(this.generate({
                    id: payload.id,
                    name: payload.name,
                    user: payload.user
                }));
            }));
    }

    private generate(data: any): IToken
    {
        data.exp = jwt.expiresAt;
        return {
            access_token: JWT.sign(data, jwt.secret),
            refresh_token: JWT.sign({ ...data, exp: data.exp * 10, refresh: true }, jwt.secret)
        }
    }

}