import { DeviceAdder } from "../dao/mongodb/device/addDevice";
import { Device } from '../dao/device/device';

// Update dependencies with logger etc
interface Dependencies {
  mongodb: MongoDB
}

interface MongoDB extends
  DeviceAdder { }

export interface DeviceApiInterface extends
  AddDevice
{}
export interface AddDevice {
  addDevice(
    opts?: {
      id?: string,
      name?: string,
    }
  ): Promise<Device>
}

export interface GetDevice {

}

export interface UpdateDevice {

}

export default class DeviceApi implements DeviceApiInterface {
  private readonly mongodb: MongoDB

  constructor(dependencies: Dependencies) {
    this.mongodb = dependencies.mongodb
  }

  public async addDevice(
    opts:{
      id: string,
      name: string,
    }
  ):Promise<Device> {
    const device = await this.mongodb.addDevice(opts)
    return device;
  }
}
