import { authException } from '../../exceptions/auth.exception';

declare global {
  interface RefreshDto {
    accessToken: string;
    refreshToken: string;
  }
}

interface RefreshRequestBody {
  accessToken: string;
  refreshToken: string;
}

const transformRefreshData = (body: RefreshRequestBody) => {
  const { accessToken, refreshToken } = body;

  if (!accessToken) {
    authException.NEED_SIGNIN();
  }

  if (!refreshToken) {
    authException.NEED_SIGNIN();
  }

  return {
    accessToken,
    refreshToken,
  };
};

export default transformRefreshData;
