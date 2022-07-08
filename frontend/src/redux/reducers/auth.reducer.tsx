declare global {
  interface AuthData {
    user: {
      following: any[];
    };
  }
  interface AuthState {
    authData: null | AuthData;
    loading: boolean;
    error: boolean;
    updateLoading: boolean;
  }
}

interface Action {
  type: string;
  data: any;
}

const initAuthState = {
  authData: null,
  loading: false,
  error: false,
  updateLoading: false,
};

// TODO : (action : any)
const authReducer = (state = initAuthState, action: Action): AuthState => {
  let authData: AuthData;
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: false };

    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };

    case 'AUTH_FAIL':
      return { ...state, loading: false, error: true };

    case 'UPDATING_START':
      return { ...state, updateLoading: true, error: false };

    case 'UPDATING_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case 'UPDATING_FAIL':
      return { ...state, updateLoading: true, error: true };

    case 'SIGN_OUT':
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
      };

    case 'FOLLOW_USER':
      authData = state.authData as unknown as AuthData;
      return {
        ...state,
        authData: {
          ...authData,
          user: {
            ...authData.user,
            following: [...authData.user.following, action.data],
          },
        },
      };

    case 'UNFOLLOW_USER':
      authData = state.authData as unknown as AuthData;
      return {
        ...state,
        authData: {
          ...authData,
          user: {
            ...authData.user,
            following: [
              ...authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };

    default:
      return state;
  }
};

export default authReducer;
