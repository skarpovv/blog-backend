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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { username, password } = req.body;
                // const isExistUser = await userModel.findOne({ username });
                // if (isExistUser) {
                //   res.status(400).json({ message: `User ${username} already exist` });
                // }
                // const user = new userModel({
                //   username,
                //   password: this._passwordHash(password),
                // });
                // return res.json();
            }
            catch (e) {
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
