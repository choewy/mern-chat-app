import httpRequest from '../utils/httpRequest.util';

declare global {
  interface AddMessageData {}
}

const api = httpRequest();
const messageApi = {
  getMessage: (id: string) => {
    return api.get(`/message/${id}`);
  },
  addMessage: (data: AddMessageData) => {
    return api.post(`/message`, data);
  },
};

export default messageApi;
