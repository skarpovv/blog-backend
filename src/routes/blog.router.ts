import { Router } from 'express';
import { blogController } from '../controllers/blog.controller';
import { commentController } from '../controllers/comment.controller';
import { createBlogValidators } from './validation';

const router = Router();

router.post(
  '/blogs',
  createBlogValidators,
  blogController.createBlog.bind(blogController)
);
router.get('/blogs', blogController.getBlogs.bind(blogController));
router.get('/blogs/:id', blogController.getBlogById.bind(blogController));
router.put(
  '/blogs/:id',
  createBlogValidators,
  blogController.updateBlog.bind(blogController)
);
router.delete('/blogs/:id', blogController.deleteBlog.bind(blogController));
router.get(
  '/blogs/:id/comments',
  commentController.getCommentsByBlog.bind(commentController)
);
router.post(
  '/comments',
  commentController.createComment.bind(commentController)
);
router.get('/blogs/search', blogController.searchBlogs.bind(blogController));
router.put(
  '/comments/:id',
  commentController.updateComment.bind(commentController)
);
router.delete(
  '/comments/:id',
  commentController.deleteComment.bind(commentController)
);

export default router;
