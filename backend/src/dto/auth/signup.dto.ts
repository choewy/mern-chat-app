import { authException } from '../../exceptions/auth.exception';
import bcryptModule from '../../utils/bcrypt.module';

declare global {
  interface SignUpDto {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
  }
}

interface SignUpRequestBody {
  username: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

const transformSignUpData = (body: SignUpRequestBody): SignUpDto => {
  const { username, password, confirmPassword, firstname, lastname } = body;

  if (!username) {
    authException.USER_NAME();
  }

  if (!password) {
    authException.PASSWORD();
  }

  if (password !== confirmPassword) {
    authException.NOT_SAME_PASSWORD();
  }

  if (!firstname) {
    authException.FIRST_NAME();
  }

  if (!lastname) {
    authException.LAST_NAME();
  }

  return {
    username,
    password: bcryptModule.hashPassword(password),
    firstname,
    lastname,
  };
};

export default transformSignUpData;
