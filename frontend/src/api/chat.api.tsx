import httpRequest from '../utils/httpRequest.util';

declare global {
  interface CreateChatData {}
}

const api = httpRequest();
const chatApi = {
  createChat: (data: CreateChatData) => {
    return api.post('/chat', data);
  },
  getUserChats: (id: string) => {
    return api.get(`/chat/${id}`);
  },
  getChat: (firstId: string, secondId: string) => {
    return api.get(`/chat/find/${firstId}/${secondId}`);
  },
};

export default chatApi;
