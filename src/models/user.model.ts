import { Schema, model } from 'mongoose';
import { IRole } from './role.model';

export interface IUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  roles: IRole[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
});

export const User = model('User', userSchema);
