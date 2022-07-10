import { Request } from "express";
import { JWTToken } from "./jwt";

export interface UserAuthRequest extends Request {
  user?: JWTToken;
}
