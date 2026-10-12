import jwt, { SignOptions } from "jsonwebtoken";
import { IUserPayload } from "../types";
import { config } from "../config/env.config";

export const signToken = (payload: IUserPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn,
  };
  return jwt.sign(payload as object, config.jwt.secret, options);
};

export const verifyToken = (token: string): IUserPayload => {
  return jwt.verify(token, config.jwt.secret) as IUserPayload;
};