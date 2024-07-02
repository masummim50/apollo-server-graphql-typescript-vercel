import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
    return decoded;
  } catch (error) {
    console.log("Error verifying token:", error);
    return {};
  }
  
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
