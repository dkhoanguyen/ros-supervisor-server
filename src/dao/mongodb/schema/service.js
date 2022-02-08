"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModel = exports.serviceSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
exports.serviceSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: Number, required: true },
});
exports.ServiceModel = mongoose_1.default.model('Service', exports.serviceSchema);
