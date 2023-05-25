"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function default_1(req, res, next) {
    var _a, _b;
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Not autorized" });
        }
        const decodedData = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({ message: "Not autorized" });
    }
}
exports.default = default_1;
;
