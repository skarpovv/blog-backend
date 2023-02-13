"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("username", "Username cannot be empty").notEmpty(),
    (0, express_validator_1.check)("password", "Password min length - 8 characters").isLength({
        min: 8,
    }),
], auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post("/login", auth_controller_1.authController.login.bind(auth_controller_1.authController));
router.get("/users", auth_controller_1.authController.getUsers.bind(auth_controller_1.authController));
exports.default = router;
