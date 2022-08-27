import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  res.status(status).send({
    status,
    message
  });
};

export default errorHandler;
