import { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import userService from '../services/user.service';

const userController = (controllerResponse: ControllerResponse) => ({
  prefix: '/user',
  callbacks: [
    {
      path: '/',
      method: 'get',
      middlewares: [],
      callback: async (_: Request, res: Response) => {
        try {
          const result = await userService.getAllUsers();
          controllerResponse.success(res, 200, result);
        } catch (error) {
          controllerResponse.error(res, error);
        }
      },
    },
    {
      path: '/:id',
      method: 'get',
      middlewares: [],
      callback: async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const result = await userService.getUser(id);
          controllerResponse.success(res, 200, result);
        } catch (error) {
          controllerResponse.error(res, error);
        }
      },
    },
    {
      path: '/:id',
      method: 'patch',
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
  ],
});

export default userController;
