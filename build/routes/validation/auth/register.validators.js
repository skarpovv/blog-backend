"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidators = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidators = [
    (0, express_validator_1.check)("username", "Username cannot be empty").notEmpty(),
];
