import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { check } from 'express-validator';
import { registerValidators } from './validation';
import { loginValidators } from './validation/auth/login.validators';

const router = Router();

router.post(
  '/register',
  registerValidators,
  authController.register.bind(authController)
);
router.post(
  '/login',
  loginValidators,
  authController.login.bind(authController)
);
// router.get('/users', authController.getUsers.bind(authController));

export default router;
