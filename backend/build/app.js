"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongoDb_1 = require("./database/mongoDb");
const auth0_1 = __importDefault(require("./auth/auth0"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(auth0_1.default);
app.get('/', (req, res) => {
    res.send("Scissor App");
});
//app.use('/api/v1/url', routes)
app.use('/', routes_1.default);
app.listen(config_1.Port, () => {
    console.log(`Application started at http://localhost:${config_1.Port}`);
    (0, mongoDb_1.connectDB)();
});
