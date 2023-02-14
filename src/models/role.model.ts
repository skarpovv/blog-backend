import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export const Role = model('Role', roleSchema);
