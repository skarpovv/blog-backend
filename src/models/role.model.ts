import { Schema, model } from 'mongoose';

export enum IRole {
  User = 'USER',
  Admin = 'ADMIN',
}

const roleSchema = new Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export const Role = model('Role', roleSchema);
