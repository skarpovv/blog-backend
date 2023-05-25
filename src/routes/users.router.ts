import { Router } from 'express';
import { userController } from '../controllers/users.controller';

const router = Router();

router.get('/', userController.getUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.get('/search', userController.searchUsers.bind(userController));
router.get('/:userId/blogs', userController.getUserBlogs.bind(userController));

export default router;
