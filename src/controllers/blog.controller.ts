import { Request, Response } from 'express';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';

class BlogController {
  async createBlog(req: any, res: Response) {
    try {
      const { title, content } = req.body;
      const author = req.user.id; // Assuming you have middleware that extracts the user ID from the JWT

      const blog = new Blog({
        title,
        content,
        author,
      });

      await blog.save();

      return res.json(blog);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error creating blog' });
    }
  }

  async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.find().populate('author', 'username');

      return res.json(blogs);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error fetching blogs' });
    }
  }

  async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id).populate('author', 'username');

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      return res.json(blog);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error fetching blog' });
    }
  }

  async searchUsers(req: Request, res: Response) {
    try {
      const { query } = req.query;

      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      });

      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error searching users' });
    }
  }

  async searchBlogs(req: Request, res: Response) {
    try {
      const { query } = req.query;

      const blogs = await Blog.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
        ],
      });

      return res.json(blogs);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error searching blogs' });
    }
  }
  async updateBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      return res.json(updatedBlog);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error updating blog' });
    }
  }

  async deleteBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      return res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error deleting blog' });
    }
  }

}

export const blogController = new BlogController();
