import { Schema, model } from 'mongoose';
import { IComment } from './comment.model'

export interface IBlog {
  title: string;
  content: string;
  author: string; // You can store the author's username or user ID here
  comments: IComment[];
  createdAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export const Blog = model('Blog', blogSchema);
