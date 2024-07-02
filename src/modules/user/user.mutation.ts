import { Secret } from "jsonwebtoken";
import { envVariables } from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { userModel } from "./user.model";
import bcrypt from "bcrypt";

const signUpMutation = async (parent: any, args: any, context: any) => {
  console.log("jwt secret key: ", envVariables.jwtSecretKey);
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(args.password, salt);
  const user = await userModel.create({ ...args, password: encrypted });
  console.log("sign up rsult: ", user);

  return { message: "signUp successfull", success: true };
};

const loginMutation = async (parent: any, args: any, context: any) => {
  const user = await userModel.findOne({ email: args.email });
  if (!user?.password) {
    return {
      token: null,
      success: false,
      message: "invalid credentials/user not found",
    };
  }

  const isPasswordMatch = await bcrypt.compare(args.password, user?.password);
  // if password matches generate token and send it
  if (isPasswordMatch) {
    // generate token here
    const token = jwtHelpers.createToken(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      envVariables.jwtSecretKey as Secret,
      "60days"
    );
    return { token: token, success: true, message: "logged in successfully" };
  } else {
    return {
      token: null,
      success: false,
      message: "password incorrect",
    };
  }
};

export const userMutation = {
  signUpMutation,
  loginMutation
};
