"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModel = exports.deviceSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
exports.deviceSchema = new mongoose_2.Schema({
    id: { type: String, required: true },
    token: { type: String, required: true },
    name: { type: String, required: true },
    created: { type: Date, required: true },
    macAddress: { type: String, required: true },
    role: { type: Number, required: true },
});
exports.DeviceModel = mongoose_1.default.model('Device', exports.deviceSchema);
