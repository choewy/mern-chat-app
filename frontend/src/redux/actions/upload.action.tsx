import uploadApi from '../../api/upload.api';

const uploadAction = {
  uploadImage: (data: UploadImageData) => async (dispatch: any) => {
    try {
      await uploadApi.uploadImage(data);
    } catch (err) {
      console.log(err);
    }
  },
};

export default uploadAction;
