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
exports.commentController = void 0;
const comment_model_1 = require("../models/comment.model");
const blog_model_1 = require("../models/blog.model");
class CommentController {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { blogId, content } = req.body;
                const blog = yield blog_model_1.Blog.findById(blogId);
                if (!blog) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                const comment = new comment_model_1.Comment({
                    blog: blogId,
                    content,
                });
                yield comment.save();
                return res.json(comment);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error creating comment' });
            }
        });
    }
    getCommentsByBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { blogId } = req.params;
                const comments = yield comment_model_1.Comment.find({ blog: blogId });
                return res.json(comments);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error fetching comments' });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { content } = req.body;
                const updatedComment = yield comment_model_1.Comment.findByIdAndUpdate(id, { content }, { new: true });
                if (!updatedComment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                return res.json(updatedComment);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error updating comment' });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedComment = yield comment_model_1.Comment.findByIdAndDelete(id);
                if (!deletedComment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                return res.json({ message: 'Comment deleted successfully' });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Error deleting comment' });
            }
        });
    }
}
exports.commentController = new CommentController();
