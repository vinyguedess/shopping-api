import * as dotenv from "dotenv";

dotenv.config();

export default {
    driver: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}