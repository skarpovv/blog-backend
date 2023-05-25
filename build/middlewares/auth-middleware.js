"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function default_1(req, res, next) {
    var _a;
    if (req.method === 'OPTIONS') {
        // Allow preflight requests to pass
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY, (error, decodedData) => {
            if (error) {
                console.log(error);
                return res.status(403).json({ message: 'Not authorized' });
            }
            req.user = decodedData;
            next();
        });
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({ message: 'Not authorized' });
    }
}
exports.default = default_1;
