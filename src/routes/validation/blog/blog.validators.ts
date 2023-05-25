import { check, ValidationChain } from 'express-validator';

export const createBlogValidators: ValidationChain[] = [
  check('title', 'Title cannot be empty').notEmpty(),
  check('content', 'Content cannot be empty').notEmpty(),
];
