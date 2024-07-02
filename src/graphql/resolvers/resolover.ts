import { postMutation } from "../../modules/post/post.mutation";
import { userModel } from "../../modules/user/user.model";
import { userMutation } from "../../modules/user/user.mutation";

export const resolvers = {
  Query: {
    users: async () => {
      const users = await userModel.find();
      return users;
    },
  },
  Mutation: {
    signUp: userMutation.signUpMutation,
    login: userMutation.loginMutation,
    addPost: postMutation.addPostMutation
  }
};



