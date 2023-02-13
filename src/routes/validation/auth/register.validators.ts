import { check, ValidationChain } from 'express-validator';

export const registerValidators: ValidationChain[] = [
  check('username', 'Username cannot be empty').notEmpty(),
  check('password', 'Password min length - 8 characters').isLength({ min: 8 }),
  check('email', 'Email cannot be empty').notEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('fullName', 'Full name cannot be empty').notEmpty(),
];
