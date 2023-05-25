import { check, ValidationChain } from 'express-validator';

export const loginValidators: ValidationChain[] = [
  check('login', 'Login must be not empty').notEmpty(),
  check('password', 'Password must be not empty').notEmpty(),
  check('password', 'Min password length - 8 characters').isLength({ min: 8 }),
];
