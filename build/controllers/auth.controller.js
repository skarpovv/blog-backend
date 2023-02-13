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
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
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
                        .json({ message: "Validation Error", validationErrors });
                }
                const { username, password } = req.body;
                console.log(username, password);
                const isExistUser = yield user_model_1.default.findOne({ username });
                console.log(isExistUser);
                if (isExistUser) {
                    return res
                        .status(400)
                        .json({ message: `User ${username} already exist` });
                }
                const userRole = yield role_model_1.default.findOne({ value: "USER" });
                console.log(userRole);
                // const hashPassword = bcrypt.hashSync(password, 7);
                const user = new user_model_1.default({
                    username: username,
                    password: this._passwordHash(password),
                    roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value],
                });
                console.log("User: ", user);
                yield user.save();
                return res.json({ message: "User created" });
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: "Registration Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                res.status(400).json({ message: "Login Error" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json("Server Works");
            }
            catch (error) { }
        });
    }
    _passwordHash(password) {
        return bcryptjs_1.default.hashSync(password, 7);
    }
}
exports.authController = new AuthController();
