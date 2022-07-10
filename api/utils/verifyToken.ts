import { NextFunction, Response } from "express";
import { UserAuthRequest } from "../types/request";
import HttpException from "../exceptions/HttpException";
import jwt from "jsonwebtoken";
import { JWTToken } from "../types/jwt";

export const verifyToken = (req: UserAuthRequest, res: Response, callback: Function) => {
  const token = req.cookies.access_token;
  if (!token) {
    return callback(new HttpException(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, data: any) => {
    if (err) {
      return callback(new HttpException(403, "Token is not valid!"));
    }
    const decodedToken = data as JWTToken;
    if (decodedToken) req.user = decodedToken;
    callback();
  });
};

export const verifyUser = (req: UserAuthRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, (error?: HttpException) => {
    if (error) return next(error);

    if (req.user) {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(new HttpException(403, "You are not authorized!"));
      }
    }
  });
};

export const verifyAdmin = (req: UserAuthRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, (error?: HttpException) => {
    if (error) return next(error);

    if (req.user?.isAdmin) {
      next();
    } else {
      return next(new HttpException(403, "You are not authorized!"));
    }
  });
};
