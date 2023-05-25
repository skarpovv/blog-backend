import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Blog } from '../models/blog.model';

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user' });
    }
  }

  async searchUsers(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const users = await User.find({
        $or: [
          { fullName: { $regex: query, $options: 'i' } },
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to search users' });
    }
  }

  async getUserBlogs(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const blogs = await Blog.find({ author: userId });

      return res.json(blogs);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error fetching user blogs' });
    }
  }
}

export const userController = new UserController();
