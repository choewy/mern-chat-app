import { Request, Response } from 'express';
import transformRefreshData from '../dto/auth/refresh.dto';
import transformSignInData from '../dto/auth/signin.dto';
import transformSignUpData from '../dto/auth/signup.dto';
import authMiddleware from '../middlewares/auth.middleware';
import authService from '../services/auth.service';

const authController = (controllerResponse: ControllerResponse) => ({
  prefix: '/auth',
  callbacks: [
    {
      path: '/',
      method: 'get',
      middlewares: [authMiddleware],
      callback: async (req: Request, res: Response) => {
        try {
          const { _id } = req.body;
          controllerResponse.success(res, 200, { _id });
        } catch (error) {
          controllerResponse.error(res, error);
        }
      },
    },
    {
      path: '/refresh',
      method: 'post',
      middlewares: [],
      callback: async (req: Request, res: Response) => {
        try {
          const refreshDto = transformRefreshData(req.body);
          const result = await authService.refreshAuth(refreshDto);
        } catch (error) {
          controllerResponse.error(res, error);
        }
      },
    },
    {
      path: '/signup',
      method: 'post',
      middlewares: [],
      callback: async (req: Request, res: Response) => {
        try {
          const signUpDto = transformSignUpData(req.body);
          const result = await authService.signUpUser(signUpDto);
          controllerResponse.success(res, 201, result);
        } catch (error) {
          controllerResponse.error(res, error);
        }
      },
    },
    {
      path: '/signin',
      method: 'post',
      middlewares: [],
      callback: async (req: Request, res: Response) => {
        try {
          const signInDto = transformSignInData(req.body);
          const result = await authService.signInUser(signInDto);
          controllerResponse.success(res, 200, result);
        } catch (error) {
          controllerResponse.error(res, error);
        }
      },
    },
  ],
});

export default authController;
