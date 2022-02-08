"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = exports.DeviceRole = void 0;
var DeviceRole;
(function (DeviceRole) {
    DeviceRole[DeviceRole["Orchestrator"] = 0] = "Orchestrator";
    DeviceRole[DeviceRole["Player"] = 1] = "Player";
})(DeviceRole = exports.DeviceRole || (exports.DeviceRole = {}));
class Device {
    constructor(id, name, created, token, macAddress, role) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.token = token;
        this.macAddress = macAddress;
        this.role = role;
        this.updateRate = 0;
        this.services = new Array();
    }
    static fromInterface(data) {
        return new this(data.id, data.name, data.created, data.token, data.macAddress, data.role);
    }
    updateDevice(device) {
        this.id = device.id;
        this.name = device.name;
    }
}
exports.Device = Device;
