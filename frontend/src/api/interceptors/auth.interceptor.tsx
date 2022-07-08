import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import localStorageUtil from '../../utils/localStorage.util';

declare global {
  interface ProfileData {
    token: string;
  }
}

const authInterceptor = (req: AxiosRequestConfig<any>) => {
  const profile = localStorageUtil.parse('profile') as ProfileData;
  if (profile) {
    const headers = req.headers as AxiosRequestHeaders;
    headers.Authorization = `Bearer ${profile.token}`;
  }
  return req;
};

export default authInterceptor;
