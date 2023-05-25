"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.get('/', users_controller_1.userController.getUsers.bind(users_controller_1.userController));
router.get('/:id', users_controller_1.userController.getUserById.bind(users_controller_1.userController));
router.get('/search', users_controller_1.userController.searchUsers.bind(users_controller_1.userController));
exports.default = router;
