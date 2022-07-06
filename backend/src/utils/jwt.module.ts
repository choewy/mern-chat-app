import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { authException } from '../exceptions/auth.exception';

declare global {
  interface GlobalPayload {
    id: string;
  }

  interface AccessPayload extends GlobalPayload {
    username: string;
  }

  interface RefreshPayload extends GlobalPayload {}
}

const secret = String(process.env.JWT);
const jwtModule = {
  generateAccessToken: (user: MongoResult) => {
    const { _id, username } = user._doc;
    const payload: AccessPayload = {
      id: String(_id),
      username: String(username),
    };
    return jwt.sign(payload, secret, { expiresIn: '1m' });
  },
  generateRefreshToken: (user: MongoResult) => {
    const { _id } = user._doc;
    const payload: RefreshPayload = {
      id: String(_id),
    };
    return jwt.sign(payload, secret, { expiresIn: '14d' });
  },
  verifyToken: (token: string) => {
    if (!token) {
      authException.NEED_SIGNIN();
    }
    try {
      return jwt.verify(token, secret) as AccessPayload;
    } catch (error) {
      const { message } = error as JsonWebTokenError;
      switch (message) {
        case 'jwt expired':
          authException.EXPIRED_TOKEN();
        default:
          authException.INVALID_TOKEN();
      }
    }
  },
  decodeToken: (token: string) => {
    if (!token) {
      authException.NEED_SIGNIN();
    }
    try {
      return jwt.decode(token);
    } catch (error) {
      authException.INVALID_TOKEN();
    }
  },
};

export default jwtModule;
