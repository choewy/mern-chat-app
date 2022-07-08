declare global {
  interface PostData {}

  interface PostState {
    posts: null | PostData[];
    loading: boolean;
    error: boolean;
    uploading: boolean;
  }
}

interface Action {
  type: string;
  data: any;
}

const initPostState = {
  posts: null,
  loading: false,
  error: false,
  uploading: false,
};

const postReducer = (state = initPostState, action: Action) => {
  let oldPosts = [];
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, error: false, uploading: true };

    case 'UPLOAD_SUCCESS':
      oldPosts = state.posts as unknown as PostData[];
      return {
        ...state,
        posts: [action.data, ...oldPosts],
        uploading: false,
        error: false,
      };

    case 'RETREIVING_START':
      return { ...state, loading: true, error: false };

    case 'RETREIVING_SUCCESS':
      return { ...state, posts: action.data, loading: false, error: false };

    case 'RETREIVING_FAIL':
    case 'UPLOAD_FAIL':
      return { ...state, uploading: false, error: true };

    default:
      return state;
  }
};

export default postReducer;
