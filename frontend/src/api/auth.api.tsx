import httpRequest from '../utils/httpRequest.util';

declare global {
  interface SignInFormData {}
  interface SignUpFormData {}
}

const api = httpRequest();
const authApi = {
  signIn: (formData: SignInFormData) => {
    return api.post('/auth/signin', formData);
  },
  signUp: (formData: SignUpFormData) => {
    return api.post('/auth/signup', formData);
  },
};

export default authApi;
