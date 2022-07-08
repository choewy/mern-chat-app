import { Schema, model } from 'mongoose';

const ChatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = model('Chats', ChatSchema);

export default ChatModel;
