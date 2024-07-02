"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./api/index"));
const consola_1 = __importDefault(require("consola"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
index_1.default.listen(3000, () => consola_1.default.info("Server running on port"));
