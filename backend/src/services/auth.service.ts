import { authException } from '../exceptions/auth.exception';
import UserModel from '../models/user.model';
import bcryptModule from '../utils/bcrypt.module';
import jwtModule from '../utils/jwt.module';

const authService = {
  signUpUser: async (signUpDto: SignUpDto) => {
    const { username } = signUpDto;
    const oldUser = (await UserModel.findOne({ username })) as MongoResult;
    if (oldUser) {
      authException.ALREADY_EXIST_USER();
    }

    const user = new UserModel(signUpDto);
    await user.save();

    return {
      user,
      tokens: {
        accessToken: jwtModule.generateAccessToken(
          user as unknown as MongoResult
        ),
        refreshToken: jwtModule.generateRefreshToken(
          user as unknown as MongoResult
        ),
      },
    };
  },
  signInUser: async (signInDto: SignInDto) => {
    const { username, password } = signInDto;
    const user = (await UserModel.findOne({ username })) as MongoResult;

    if (!user) {
      authException.NOT_FOUND_USER();
    }

    if (!bcryptModule.comparePassword(password, String(user?._doc.password))) {
      authException.WRONG_PASSWORD();
    }

    return {
      user,
      tokens: {
        accessToken: jwtModule.generateAccessToken(user),
        refreshToken: jwtModule.generateRefreshToken(user),
      },
    };
  },
  refreshAuth: async (refreshDto: RefreshDto) => {
    const { accessToken, refreshToken } = refreshDto;
    const accessDecoded = jwtModule.decodeToken(accessToken) as AccessPayload;
    const refreshDecoded = jwtModule.decodeToken(
      refreshToken
    ) as RefreshPayload;

    if (accessDecoded.id !== refreshDecoded.id) {
      authException.INVALID_TOKEN();
    }

    const user = (await UserModel.findById(accessDecoded.id)) as MongoResult;
    if (!user) {
      authException.NOT_FOUND_USER();
    }

    return {
      user,
      tokens: {
        accessToken: jwtModule.generateAccessToken(user),
        refreshToken: jwtModule.generateRefreshToken(user),
      },
    };
  },
};

export default authService;
