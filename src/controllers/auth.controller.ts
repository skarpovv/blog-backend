import { model } from "mongoose";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import roleModel from "../models/role.model";
import bcrypt from "bcryptjs";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      // const { username, password } = req.body;
      // const isExistUser = await userModel.findOne({ username });
      // if (isExistUser) {
      //   res.status(400).json({ message: `User ${username} already exist` });
      // }
      // const user = new userModel({
      //   username,
      //   password: this._passwordHash(password),
      // });
      // return res.json();
    } catch (e) {
      res.status(400).json({ message: "Registration Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (error) {
      res.status(400).json({ message: "Login Error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.json("Server Works");
    } catch (error) {}
  }

  private _passwordHash(password: string) {
    return bcrypt.hashSync(password, 7);
  }
}

export const authController = new AuthController();
