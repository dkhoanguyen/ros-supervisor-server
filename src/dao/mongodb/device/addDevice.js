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
exports.addDevice = void 0;
const device_1 = require("../../device/device");
const device_2 = require("../schema/device");
function addDevice({ id, name, macAddress, token, role }) {
    return __awaiter(this, void 0, void 0, function* () {
        const newDevice = new device_2.DeviceModel({
            id: id,
            name: name,
            macAddress: macAddress,
            token: token,
            role: role,
            created: new Date(new Date().getDate()),
        });
        yield newDevice.save();
        return device_1.Device.fromInterface(newDevice);
    });
}
exports.addDevice = addDevice;
exports.default = () => {
    return (newDevice) => __awaiter(void 0, void 0, void 0, function* () {
        return addDevice(newDevice);
    });
};
