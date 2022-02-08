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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const mongodb_1 = __importDefault(require("./dao/mongodb"));
const api_1 = require("./api");
const createServer_1 = __importDefault(require("./http/createServer"));
const server_1 = require("./service/rest/server");
const listen_1 = __importDefault(require("./http/listen"));
function start(host, port) {
    return __awaiter(this, void 0, void 0, function* () {
        // const config = getConfigFromEnvironment(process.env)
        const config = {
            DB_HOST: host,
            DB_PORT: 27017,
            DB_NAME: "Device",
            DB_USER: "admin",
            DB_PASSWORD: "admin"
        };
        const mongodb = yield (0, mongodb_1.default)(config);
        const api = yield (0, api_1.makeApi)({ mongodb });
        const server = yield (0, createServer_1.default)();
        const restApp = yield (0, server_1.makeRest)({ api });
        server.on('request', (req, res) => {
            const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);
            switch (true) {
                case pathname.startsWith('/api'):
                    console.log({ pathname }, "Handle rest request");
                    return restApp(req, res);
                default:
                    res.writeHead(404);
                    res.end('Not Found');
            }
        });
        const { address, port: actualPort } = yield (0, listen_1.default)(server, { host, port });
        console.log(address, actualPort);
    });
}
exports.start = start;
start("localhost", 3000);
