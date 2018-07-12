import * as Sequelize from "sequelize";
import Database from "../../../Core/Database";


const DB = Database();
export default DB.define("products", {
    name: Sequelize.STRING
},
    {
        underscored: true
    });