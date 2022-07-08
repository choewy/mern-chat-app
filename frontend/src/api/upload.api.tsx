import httpRequest from '../utils/httpRequest.util';
import authInterceptor from './interceptors/auth.interceptor';

declare global {
  interface UploadImageData {}
}

const api = httpRequest([authInterceptor]);
const uploadApi = {
  uploadImage: (data: UploadImageData) => {
    return api.post('/upload', data);
  },
};

export default uploadApi;
