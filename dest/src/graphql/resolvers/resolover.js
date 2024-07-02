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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const post_mutation_1 = require("../../modules/post/post.mutation");
const user_model_1 = require("../../modules/user/user.model");
const user_mutation_1 = require("../../modules/user/user.mutation");
exports.resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield user_model_1.userModel.find();
            return users;
        }),
    },
    Mutation: {
        signUp: user_mutation_1.userMutation.signUpMutation,
        login: user_mutation_1.userMutation.loginMutation,
        addPost: post_mutation_1.postMutation.addPostMutation
    }
};
