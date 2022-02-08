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
const mongoose_1 = __importDefault(require("mongoose"));
const collections_1 = require("../mongodb/schema/collections");
// Should we change this to not be asynchronous ?
function connect({ DB_HOST: host, DB_PORT: port, DB_NAME: name, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUri = `mongodb://${host}:${port}/${name}`;
        // Create a connection to the database
        try {
            yield mongoose_1.default.connect(dbUri);
            const connection = mongoose_1.default.connection;
            // Create collections
            createCollections(connection);
            return connection;
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    });
}
exports.default = connect;
function createCollection(connectionObj, collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if collection exists
        const existingCollection = yield connectionObj.db.listCollections().toArray();
        let collectionExist = false;
        for (let indx in existingCollection) {
            if (existingCollection[indx].name === collectionName) {
                collectionExist = true;
                break;
            }
        }
        // Only create collection if it does not exists
        if (!collectionExist) {
            yield connectionObj.createCollection(collectionName).then(() => {
                console.log(`Created collection: ${collectionName}`);
            });
        }
        else {
            console.log("Collection already exists. Skipping collection creation");
        }
    });
}
function createCollections(connectionObj) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let collection of collections_1.collections) {
            yield createCollection(connectionObj, collection);
        }
    });
}
