"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidators = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidators = [
    (0, express_validator_1.check)('username', 'Username cannot be empty').notEmpty(),
    (0, express_validator_1.check)('password', 'Password min length - 8 characters').isLength({ min: 8 }),
    (0, express_validator_1.check)('email', 'Email cannot be empty').notEmpty(),
    (0, express_validator_1.check)('email', 'Email is not valid').isEmail(),
    (0, express_validator_1.check)('fullName', 'Full name cannot be empty').notEmpty(),
];
