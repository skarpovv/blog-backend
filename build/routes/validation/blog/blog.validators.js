"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogValidators = void 0;
const express_validator_1 = require("express-validator");
exports.createBlogValidators = [
    (0, express_validator_1.check)('title', 'Title cannot be empty').notEmpty(),
    (0, express_validator_1.check)('content', 'Content cannot be empty').notEmpty(),
];
