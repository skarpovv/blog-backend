"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidators = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidators = [
    (0, express_validator_1.check)('login', 'Login must be not empty').notEmpty(),
    (0, express_validator_1.check)('password', 'Password must be not empry').notEmpty(),
    (0, express_validator_1.check)('password', 'Min password length - 8 characters').isLength({ min: 8 }),
];
