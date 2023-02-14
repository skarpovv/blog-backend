"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (!validationErrors.isEmpty()) {
                    return res
                        .status(400)
                        .json({ message: 'Validation Error', validationErrors });
                }
                const { username, password, email, fullName } = req.body;
                const isExistUser = yield user_model_1.User.findOne({ username });
                if (isExistUser) {
                    return res
                        .status(400)
                        .json({ message: `User ${username} already exist` });
                }
                const userRole = yield role_model_1.Role.findOne({ value: 'USER' });
                const user = new user_model_1.User({
                    username,
                    email,
                    fullName,
                    password: this._passwordHash(password),
                    roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value],
                });
                yield user.save();
                return res.json(user);
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: 'Registration Error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (!validationErrors.isEmpty()) {
                    return res
                        .status(400)
                        .json({ message: 'Validation Errors', errors: validationErrors });
                }
                const { login, password } = req.body;
                const dbUser = yield user_model_1.User.findOne({
                    $or: [{ username: login }, { email: login }],
                });
                if (!dbUser)
                    return res.status(400).json({ messgae: 'User not exist' });
                if (!bcryptjs_1.default.compareSync(password, dbUser.password))
                    return res.status(400).json({ message: 'Password incorrect' });
                return res.json({ message: 'Login succesfull' });
            }
            catch (error) {
                res.status(400).json({ message: 'Login Error' });
            }
        });
    }
    // async getUsers(req: Request, res: Response) {
    //   try {
    //     res.json('Server Works');
    //   } catch (error) {}
    // }
    _passwordHash(password) {
        return bcryptjs_1.default.hashSync(password, 7);
    }
}
exports.authController = new AuthController();
