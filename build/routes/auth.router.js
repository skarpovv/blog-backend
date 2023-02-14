"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_1 = require("./validation");
const login_validators_1 = require("./validation/auth/login.validators");
const router = (0, express_1.Router)();
router.post('/register', validation_1.registerValidators, auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post('/login', login_validators_1.loginValidators, auth_controller_1.authController.login.bind(auth_controller_1.authController));
// router.get('/users', authController.getUsers.bind(authController));
exports.default = router;
