"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeviceRoute = void 0;
const express_1 = __importDefault(require("express"));
const handler_1 = require("../handler");
function makeDeviceRoute(dependencies) {
    const router = express_1.default.Router();
    router.post('/', handler_1.handler.addDevice(dependencies.device));
    router.get('/:id', handler_1.handler.getDevice(dependencies.device));
    return router;
}
exports.makeDeviceRoute = makeDeviceRoute;
