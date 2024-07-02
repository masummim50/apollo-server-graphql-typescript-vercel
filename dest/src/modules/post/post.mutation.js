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
exports.postMutation = void 0;
const config_1 = require("../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const post_model_1 = require("./post.model");
const graphql_1 = require("graphql");
const signUpMutation = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("jwt secret key: ", config_1.envVariables.jwtSecretKey);
    const salt = yield bcrypt_1.default.genSalt(10);
    const encrypted = yield bcrypt_1.default.hash(args.password, salt);
    const user = yield user_model_1.userModel.create(Object.assign(Object.assign({}, args), { password: encrypted }));
    console.log("sign up rsult: ", user);
    return { message: "signUp successfull", success: true };
});
const addPostMutation = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("context: ", context);
    const { title, content } = args;
    if (context == null) {
        throw new graphql_1.GraphQLError("You are not authorized to perform this action", { extensions: { code: "UNAUTHENTICATED" } });
    }
    const newPost = yield post_model_1.postModel.create({
        title,
        content,
        author: context._id
    }, { new: true });
    return newPost;
});
exports.postMutation = {
    signUpMutation,
    addPostMutation,
};
