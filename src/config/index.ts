require("dotenv").config();

export const envVariables = {
  jwtSecretKey: process.env.JWT_SECRET,
};
