import { type NextFunction, type Request, type Response } from "express";
import type ErrorHandler from "@/utils/errorHandler";
import { env } from "@/env";

const envMode = env.NODE_ENV.toUpperCase();

export const errorMiddleware = (
  err:ErrorHandler,
  req:Request,
  res:Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next:NextFunction
) => {

  err.message ||= "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  const response:{
  success: boolean,
  message: string,
  error?:ErrorHandler
  } = {
    success: false,
    message: err.message,
  };

  if (envMode === "DEVELOPMENT") {
    response.error = err;
  }

  return res.status(err.statusCode).json(response);

};

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<unknown, Record<string, unknown>>>;

export const TryCatch = (passedFunc:ControllerType) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};
