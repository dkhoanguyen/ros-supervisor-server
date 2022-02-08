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
exports.getDeviceById = void 0;
const device_1 = require("../../device/device");
const device_2 = require("../schema/device");
function getDeviceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let queriedDevice = yield device_2.DeviceModel.findOne({ 'id': id }).exec();
        const device = device_1.Device.fromInterface(queriedDevice);
        return device;
    });
}
exports.getDeviceById = getDeviceById;
exports.default = () => {
    return (id) => __awaiter(void 0, void 0, void 0, function* () {
        return getDeviceById(id);
    });
};
