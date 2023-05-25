import { Router } from 'express';
import { commentController } from '../controllers/comment.controller';

const router = Router();

router.post('/', commentController.createComment.bind(commentController));
router.put('/:id', commentController.updateComment.bind(commentController));
router.delete('/:id', commentController.deleteComment.bind(commentController));

export default router;
