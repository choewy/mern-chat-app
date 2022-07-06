import { NextFunction, Request, Response } from 'express';
import { controllerResponse } from '../controllers';
import jwtModule from '../utils/jwt.module';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const decoded = jwtModule.verifyToken(token) as GlobalPayload;
    req.body._id = decoded.id;
    next();
  } catch (error) {
    controllerResponse.error(res, error);
  }
};

export default authMiddleware;
