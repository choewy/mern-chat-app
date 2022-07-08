import axios, { AxiosRequestConfig } from 'axios';

declare global {
  interface Interceptor {
    (req: AxiosRequestConfig<any>): AxiosRequestConfig;
  }
}

const httpRequest = (interceptors?: Interceptor[]) => {
  const api = axios.create({
    baseURL: String(process.env.REACT_APP_BASE_URL),
    withCredentials: true,
  });

  interceptors?.forEach((interceptor) => {
    api.interceptors.request.use(interceptor);
  });

  return api;
};

export default httpRequest;
