"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountRoutes = void 0;
const express_1 = __importDefault(require("express"));
const device_1 = require("./device");
function mountRoutes(dependencies, app) {
    app.use(express_1.default.json());
    // Mount routes
    app.use('/api/v1/devices', (0, device_1.makeDeviceRoute)(dependencies));
    return app;
}
exports.mountRoutes = mountRoutes;
