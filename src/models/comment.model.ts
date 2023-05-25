import { Schema, model } from 'mongoose';

export interface IComment {
  blog: Schema.Types.ObjectId;
  content: string;
}

const commentSchema = new Schema<IComment>({
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  content: { type: String, required: true },
});

export const Comment = model('Comment', commentSchema);
