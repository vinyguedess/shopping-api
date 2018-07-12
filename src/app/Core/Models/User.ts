import * as crypto from "crypto";
import * as Sequelize from "sequelize";
import Database from "../Database";


const DB = Database();
export default DB.define("user", {
    name: Sequelize.STRING,
    user: Sequelize.STRING,
    pass: Sequelize.STRING
},
    {
        underscored: true,

        hooks: {
            beforeValidate(user)
            {
                user.pass = crypto.createHash("md5").update(user.pass).digest("hex");
            }
        }
    });