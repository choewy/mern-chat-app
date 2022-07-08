import { NavigateFunction } from 'react-router-dom';
import authApi from '../../api/auth.api';

const authAction = {
  signIn:
    (formData: SignInFormData, navigate: NavigateFunction) =>
    async (dispatch: any) => {
      dispatch({ type: 'AUTH_START' });
      try {
        const { data } = await authApi.signIn(formData);
        dispatch({ type: 'AUTH_SUCCESS', data });
        navigate('../home', { replace: true });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'AUTH_FAIL' });
      }
    },
  signUp:
    (formData: SignUpFormData, navigate: NavigateFunction) =>
    async (dispatch: any) => {
      dispatch({ type: 'AUTH_START' });
      try {
        const { data } = await authApi.signUp(formData);
        dispatch({ type: 'AUTH_SUCCESS', data });
        navigate('../home', { replace: true });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'AUTH_FAIL' });
      }
    },
  signOut: () => async (dispatch: any) => {
    dispatch({ type: 'SIGN_OUT' });
  },
};

export default authAction;
