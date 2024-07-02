import { Secret } from "jsonwebtoken";
import { envVariables } from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";

import bcrypt from "bcrypt";
import { userModel } from "../user/user.model";
import { postModel } from "./post.model";
import { DecodedUser } from "../..";
import { GraphQLError } from "graphql";

const signUpMutation = async (parent: any, args: any, context: any) => {
  console.log("jwt secret key: ", envVariables.jwtSecretKey);
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(args.password, salt);
  const user = await userModel.create({ ...args, password: encrypted });
  console.log("sign up rsult: ", user);

  return { message: "signUp successfull", success: true };
};

const addPostMutation = async (
  parent: any,
  args: any,
  context: DecodedUser
) => {
  console.log("context: ", context);
  const { title, content } = args;
  if(context == null){
    throw new GraphQLError("You are not authorized to perform this action", { extensions: { code: "UNAUTHENTICATED" } });
  }

  const newPost = await postModel.create(
    {
      title,
      content,
      author:context._id
    },
    { new: true }
  );

  return newPost;
};

export const postMutation = {
  signUpMutation,
  addPostMutation,
};
