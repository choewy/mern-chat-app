import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    profileImage: String,
    coverImage: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  {
    timestamps: true,
  }
);

const UserModel = model('Users', UserSchema);

export default UserModel;
