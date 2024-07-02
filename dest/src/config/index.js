"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariables = void 0;
require("dotenv").config();
exports.envVariables = {
    jwtSecretKey: process.env.JWT_SECRET,
};
