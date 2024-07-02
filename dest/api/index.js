"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const typedef_1 = require("../src/graphql/typedefs/typedef");
const resolover_1 = require("../src/graphql/resolvers/resolover");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const httpServer = http_1.default.createServer(app);
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default
            .connect(process.env.DATABASE_URL)
            .then(() => console.log("database connected: "));
    }
    catch (error) {
        console.log("Database connection establishing error:", error);
        setTimeout(connectDatabase, 5000);
    }
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
    mongoose_1.default.disconnect();
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose disconnected. Reconnecting...");
    connectDatabase();
});
const startApolloServer = (app, httpServer) => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typedef_1.typeDefs,
        resolvers: resolover_1.resolvers,
        introspection: true,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    if (mongoose_1.default.connection.readyState !== 1) {
        yield connectDatabase();
    }
    yield server.start();
    console.log("---server started");
    server.applyMiddleware({ app });
});
startApolloServer(app, httpServer);
exports.default = httpServer;
