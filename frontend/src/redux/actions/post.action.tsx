import postApi from '../../api/post.api';

const postAction = {
  getTimelinePosts: (id: string) => async (dispatch: any) => {
    dispatch({ type: 'RETREIVING_START' });
    try {
      const { data } = await postApi.getTimelinePosts(id);
      dispatch({ type: 'RETREIVING_SUCCESS', data });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'RETREIVING_FAIL' });
    }
  },
  createPost: (formData: CreatePostFormData) => async (dispatch: any) => {
    dispatch({ type: 'UPLOAD_START' });
    try {
      const { data } = await postApi.createPost(formData);
      dispatch({ type: 'UPLOAD_SUCCESS', data });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'UPLOAD_FAIL' });
    }
  },
};

export default postAction;
