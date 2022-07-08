import userApi from '../../api/user.api';

const userAction = {
  updataUser:
    (id: string, formData: UpdateUserFormData) => async (dispatch: any) => {
      dispatch({ type: 'UPDATING_START' });
      try {
        const { data } = await userApi.updateUser(id, formData);
        console.log('Action ko receive hoa hy ye : ', data);
        dispatch({ type: 'UPDATING_SUCCESS', data: data });
      } catch (error) {
        dispatch({ type: 'UPDATING_FAIL' });
      }
    },
  followUser:
    (id: string, otherData: OtherUserData) => async (dispatch: any) => {
      await userApi.followUser(id, otherData);
      dispatch({ type: 'FOLLOW_USER', data: id });
    },
  unfollowUser:
    (id: string, otherData: OtherUserData) => async (dispatch: any) => {
      await userApi.unfollowUser(id, otherData);
      dispatch({ type: 'UNFOLLOW_USER', data: id });
    },
};

export default userAction;
