import UserModel from '../models/user.model';

const userService = {
  getAllUsers: async () => {
    const users = (await UserModel.find()) as MongoResult[];
    return {
      users: users.map((user) => {
        const { password, ...others } = user._doc;
        return others;
      }),
    };
  },
  getUser: async (id: string) => {
    const user = (await UserModel.findById(id)) as MongoResult;

    if (!user) {
      throw {
        statusCode: 404,
        message: '존재하지 않는 사용자입니다.',
      };
    }

    const { password, ...others } = user._doc;
    return { user: others };
  },
};

export default userService;
