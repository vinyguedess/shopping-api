import * as path from "path";
import * as sequelize from "sequelize";
import db from "../../config/db";


export default () => new sequelize.Sequelize(db.name, db.user, db.pass, {
    host: db.host,
    dialect: db.driver,

    storage: db.name === "sqlite" ? path.resolve(`${db.name}.db`) : null
});