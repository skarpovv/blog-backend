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
exports.blogController = void 0;
const blog_model_1 = require("../models/blog.model");
class BlogController {
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                const author = req.user.id; // Assuming you have middleware that extracts the user ID from the JWT
                const blog = new blog_model_1.Blog({
                    title,
                    content,
                    author,
                });
                yield blog.save();
                return res.json(blog);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error creating blog' });
            }
        });
    }
    getBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blog_model_1.Blog.find().populate('author', 'username');
                return res.json(blogs);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error fetching blogs' });
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blog = yield blog_model_1.Blog.findById(id).populate('author', 'username');
                if (!blog) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                return res.json(blog);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error fetching blog' });
            }
        });
    }
    searchBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                const blogs = yield blog_model_1.Blog.find({
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { content: { $regex: query, $options: 'i' } },
                    ],
                });
                return res.json(blogs);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error searching blogs' });
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, content } = req.body;
                const updatedBlog = yield blog_model_1.Blog.findByIdAndUpdate(id, { title, content }, { new: true });
                if (!updatedBlog) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                return res.json(updatedBlog);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error updating blog' });
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedBlog = yield blog_model_1.Blog.findByIdAndDelete(id);
                if (!deletedBlog) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                return res.json({ message: 'Blog deleted successfully' });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error deleting blog' });
            }
        });
    }
}
exports.blogController = new BlogController();
