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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDevice = exports.getDevice = exports.addDevice = void 0;
function addDevice(dependency) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, macAddress, token, role } = req.body;
            const device = yield dependency.addDevice({ id, name, macAddress, token, role });
            return res
                .status(201)
                .send({ device: { id: device.id, name: device.name } });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.addDevice = addDevice;
function getDevice(dependency) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const device = yield dependency.getDevice(id);
            res.json(device);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getDevice = getDevice;
function updateDevice(dependency) {
}
exports.updateDevice = updateDevice;
