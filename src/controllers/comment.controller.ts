import { Request, Response } from 'express';
import { Comment } from '../models/comment.model';
import { Blog } from '../models/blog.model';

class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const { blogId, content } = req.body;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      const comment = new Comment({
        blog: blogId,
        content,
      });

      await comment.save();

      return res.json(comment);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error creating comment' });
    }
  }

  async getCommentsByBlog(req: Request, res: Response) {
    try {
      const { blogId } = req.params;

      const comments = await Comment.find({ blog: blogId });

      return res.json(comments);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error fetching comments' });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      return res.json(updatedComment);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error updating comment' });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      return res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error deleting comment' });
    }
  }

}

export const commentController = new CommentController();
