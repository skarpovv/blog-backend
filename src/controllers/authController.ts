import { Request, Response } from "express";

class AuthController {
  async register() {
    try {
    } catch (e) {}
  }

  async login() {
    try {
    } catch (error) {}
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.json("Server Works");
    } catch (error) {}
  }
}

export const authController = new AuthController();
