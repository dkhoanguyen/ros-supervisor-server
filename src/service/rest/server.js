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
exports.makeRest = void 0;
const createExpressApp_1 = require("../../http/createExpressApp");
const mountRoutes_1 = require("./routes/mountRoutes");
function makeRest({ api, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, createExpressApp_1.makeExpressApp)(true);
        (0, mountRoutes_1.mountRoutes)(api, app);
        return app;
    });
}
exports.makeRest = makeRest;
