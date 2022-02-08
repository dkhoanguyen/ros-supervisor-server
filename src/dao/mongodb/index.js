"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addDevice_1 = __importDefault(require("./device/addDevice"));
const getDeviceById_1 = __importDefault(require("./device/getDeviceById"));
const create_1 = __importDefault(require("./create"));
exports.default = ({ DB_HOST: host, DB_PORT: port, DB_NAME: database, DB_USER: user, DB_PASSWORD: password, }) => {
    const connection = (0, create_1.default)({
        DB_HOST: host,
        DB_PORT: port,
        DB_NAME: database,
    });
    return {
        addDevice: (0, addDevice_1.default)(),
        getDeviceById: (0, getDeviceById_1.default)()
    };
};
