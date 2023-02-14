import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { check } from 'express-validator';
import { registerValidators } from './validation';

const router = Router();

router.post(
  '/register',
  registerValidators,
  authController.register.bind(authController)
);
router.post('/login', authController.login.bind(authController));
router.get('/users', authController.getUsers.bind(authController));

export default router;
