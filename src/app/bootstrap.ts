import * as express from "express";
import * as bodyParser from "body-parser";
import Authentication from "./Core/Auth";
import { register } from "./Core/Http";
import v1 from "./API/v1";
import core from "./Core";


export const app = express();

app.use(bodyParser.json({ limit: "2mb" }));
app.use(Authentication.build());

core.initialize();
v1.initialize();

register(app);