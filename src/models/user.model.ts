import { Schema, model } from 'mongoose';

export interface IUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  roles: string[];
}

const User = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
});

export default model('User', User);
