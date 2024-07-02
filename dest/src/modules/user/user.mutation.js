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
exports.userMutation = void 0;
const config_1 = require("../../config");
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUpMutation = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("jwt secret key: ", config_1.envVariables.jwtSecretKey);
    const salt = yield bcrypt_1.default.genSalt(10);
    const encrypted = yield bcrypt_1.default.hash(args.password, salt);
    const user = yield user_model_1.userModel.create(Object.assign(Object.assign({}, args), { password: encrypted }));
    console.log("sign up rsult: ", user);
    return { message: "signUp successfull", success: true };
});
const loginMutation = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: args.email });
    if (!(user === null || user === void 0 ? void 0 : user.password)) {
        return {
            token: null,
            success: false,
            message: "invalid credentials/user not found",
        };
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(args.password, user === null || user === void 0 ? void 0 : user.password);
    // if password matches generate token and send it
    if (isPasswordMatch) {
        // generate token here
        const token = jwtHelpers_1.jwtHelpers.createToken({
            _id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
        }, config_1.envVariables.jwtSecretKey, "60days");
        return { token: token, success: true, message: "logged in successfully" };
    }
    else {
        return {
            token: null,
            success: false,
            message: "password incorrect",
        };
    }
});
exports.userMutation = {
    signUpMutation,
    loginMutation
};
