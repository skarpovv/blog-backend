"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const router = (0, express_1.Router)();
router.post('/', comment_controller_1.commentController.createComment.bind(comment_controller_1.commentController));
router.put('/:id', comment_controller_1.commentController.updateComment.bind(comment_controller_1.commentController));
router.delete('/:id', comment_controller_1.commentController.deleteComment.bind(comment_controller_1.commentController));
exports.default = router;
