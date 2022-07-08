import httpRequest from '../utils/httpRequest.util';
import authInterceptor from './interceptors/auth.interceptor';

declare global {
  interface UpdateUserFormData {}
  interface OtherUserData {}
}

const api = httpRequest([authInterceptor]);
const userApi = {
  getUser: (userId: string) => {
    return api.get(`/user/${userId}`);
  },
  getAllUser: () => {
    api.get('/user');
  },
  updateUser: (id: string, formData: UpdateUserFormData) => {
    return api.put(`/user/${id}`, formData);
  },
  followUser: (id: string, otherData: OtherUserData) => {
    return api.put(`/user/${id}/follow`, otherData);
  },
  unfollowUser: (id: string, otherData: OtherUserData) => {
    return api.put(`/user/${id}/unfollow`, otherData);
  },
};

export default userApi;
