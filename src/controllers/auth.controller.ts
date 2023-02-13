import { Request, Response } from 'express';
import userModel from '../models/user.model';
import roleModel from '../models/role.model';
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
      console.log(username, password);
      const isExistUser = await userModel.findOne({ username });

      console.log(isExistUser);
      if (isExistUser) {
        return res
          .status(400)
          .json({ message: `User ${username} already exist` });
      }

      const userRole = await roleModel.findOne({ value: 'USER' });

      console.log(userRole);

      // const hashPassword = bcrypt.hashSync(password, 7);
      const user = new userModel({
        username,
        email,
        fullName,
        password: this._passwordHash(password),
        roles: [userRole?.value],
      });

      console.log('User: ', user);

      await user.save();

      return res.json({ message: 'User created' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration Error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      res.status(400).json({ message: 'Login Error' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.json('Server Works');
    } catch (error) {}
  }

  private _passwordHash(password: string) {
    return bcrypt.hashSync(password, 7);
  }

  // private async _getUserRole(role: string) {
  //   return await roleModel.findOne({ value: "USER" });
  // }
}

export const authController = new AuthController();
