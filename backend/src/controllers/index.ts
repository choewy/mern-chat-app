import { Response, Router } from 'express';
import authController from './auth.controller';
import userController from './user.controller';

declare global {
  type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';
  type ResponseException = (error: unknown, res: Response) => void;

  interface ResponseError {
    statusCode: number;
    message: string;
  }

  interface ControllerResponse {
    error(res: Response, error: unknown): void;
    success(res: Response, statusCode: number, data: any): any;
  }
}

export const controllerResponse = {
  error: (res: Response, error: unknown) => {
    const { statusCode, message } = error as ResponseError;
    return res.status(statusCode).send({ message });
  },
  success: (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).send({ ...data });
  },
};

const controllers = () => {
  return [authController, userController].map((controller) => {
    const { prefix, callbacks } = controller(controllerResponse);
    const router = Router();
    callbacks.forEach((obj) => {
      const { path, method, callback, middlewares } = obj;
      router[method as HttpMethod](path, ...middlewares, callback);
    });
    return { prefix, router };
  });
};

export default controllers;
