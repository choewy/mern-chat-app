import { authException } from '../../exceptions/auth.exception';

declare global {
  interface SignInDto {
    username: string;
    password: string;
  }
}

interface SignInRequestBody {
  username: string;
  password: string;
}

const transformSignInData = (body: SignInRequestBody): SignInDto => {
  const { username, password } = body;

  if (!username) {
    authException.USER_NAME();
  }

  if (!password) {
    authException.PASSWORD();
  }

  return {
    username,
    password,
  };
};

export default transformSignInData;
