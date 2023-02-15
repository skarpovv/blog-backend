import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation Error', validationErrors });
      }

      const { username, password, email, fullName } = req.body;

      const isExistUser = await User.findOne({ username });

      if (isExistUser) {
        return res
          .status(400)
          .json({ message: `User ${username} already exist` });
      }

      const userRole = await Role.findOne({ value: 'USER' });

      const user = new User({
        username,
        email,
        fullName,
        password: this._passwordHash(password),
        roles: [userRole?.value],
      });

      await user.save();

      return res.json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration Error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation Errors', errors: validationErrors });
      }

      const { login, password } = req.body;

      const dbUser = await User.findOne({
        $or: [{ username: login }, { email: login }],
      });

      if (!dbUser) return res.status(400).json({ messgae: 'User not exist' });

      if (!bcrypt.compareSync(password, dbUser.password))
        return res.status(400).json({ message: 'Password incorrect' });

      return res.json({ message: 'Login succesfull' });
    } catch (error) {
      res.status(400).json({ message: 'Login Error' });
    }
  }

  // async getUsers(req: Request, res: Response) {
  //   try {
  //     res.json('Server Works');
  //   } catch (error) {}
  // }

  async test(req: Request, res: Response) {
    try {
      res.json('Server Works!');
    } catch (error) {
      res.json(error);
    }
  }

  private _passwordHash(password: string) {
    return bcrypt.hashSync(password, 7);
  }

  // private async _getUserRole(role: string) {
  //   return await roleModel.findOne({ value: "USER" });
  // }
}

export const authController = new AuthController();
