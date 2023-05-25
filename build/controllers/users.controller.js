"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
const blog_model_1 = require("../models/blog.model");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.User.find();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get users' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_model_1.User.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to get user' });
            }
        });
    }
    searchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                const users = yield user_model_1.User.find({
                    $or: [
                        { fullName: { $regex: query, $options: 'i' } },
                        { username: { $regex: query, $options: 'i' } },
                        { email: { $regex: query, $options: 'i' } },
                    ],
                });
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Failed to search users' });
            }
        });
    }
    getUserBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const blogs = yield blog_model_1.Blog.find({ author: userId });
                return res.json(blogs);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error fetching user blogs' });
            }
        });
    }
}
exports.userController = new UserController();
