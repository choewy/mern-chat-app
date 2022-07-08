declare global {
  interface ChatState {
    chatUsers: any[];
    loading: boolean;
    error: boolean;
  }
}

interface Action {
  type: string;
  data: any;
}

const initChatState = {
  chatUsers: [],
  loading: false,
  error: false,
};

const chatReducer = (state = initChatState, action: Action): ChatState => {
  switch (action.type) {
    case 'SAVE_USER':
      return { ...state, chatUsers: [...state.chatUsers, action.data] };

    default:
      return state;
  }
};

export default chatReducer;
