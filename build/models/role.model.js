"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    value: { type: String, unique: true, default: 'USER' },
});
exports.Role = (0, mongoose_1.model)('Role', roleSchema);
