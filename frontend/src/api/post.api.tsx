import httpRequest from '../utils/httpRequest.util';
import authInterceptor from './interceptors/auth.interceptor';

declare global {
  interface CreatePostFormData {}
}

const api = httpRequest([authInterceptor]);
const postApi = {
  getTimelinePosts: (id: string) => {
    return api.get(`/posts/${id}/timeline`);
  },
  linkPost: (id: string, userId: string) => {
    return api.put(`/posts/${id}/like`, { userId });
  },
  createPost: (formData: CreatePostFormData) => {
    return api.post('/posts', formData);
  },
};

export default postApi;
