"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.IRole = void 0;
const mongoose_1 = require("mongoose");
var IRole;
(function (IRole) {
    IRole["User"] = "USER";
    IRole["Admin"] = "ADMIN";
})(IRole = exports.IRole || (exports.IRole = {}));
const roleSchema = new mongoose_1.Schema({
    value: { type: String, unique: true, default: 'USER' },
});
exports.Role = (0, mongoose_1.model)('Role', roleSchema);
