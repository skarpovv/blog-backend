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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const PASS = "123123123123";
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use("/auth", auth_router_1.default);
app.use("/", (req, res) => {
    res.send("Hello world!");
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(`mongodb+srv://skarpovv:${PASS}@blog.uhiegp3.mongodb.net/?retryWrites=true&w=majority`);
        app.listen(PORT, () => {
            console.log("SERVER IS UP ON PORT:", PORT);
        });
    }
    catch (e) {
        console.error(e);
    }
});
console.log("12312");
start();
