import { DeviceAdder } from "../dao/mongodb/device/addDevice";

// Update dependencies with logger etc
interface Dependencies {
    mongodb: MongoDB
}

interface MongoDB extends
    DeviceAdder { }

export interface DeviceApiInterface { }

export default class DeviceApi implements DeviceApiInterface {
    private readonly mongodb: MongoDB

    constructor(dependencies: Dependencies) {
        this.mongodb = dependencies.mongodb
    }

    public addDevice() {

    }

    public getDevice() {

    }
}