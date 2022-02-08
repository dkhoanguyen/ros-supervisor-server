import { DeviceAdder } from "../dao/mongodb/device/addDevice";
import { DeviceGetter } from "../dao/mongodb/device/getDeviceById"
import { Device } from '../dao/device/device';
import { validateDeviceToken } from "../utils/deviceToken";

// Update dependencies with logger etc
interface Dependencies {
  mongodb: MongoDB
}

interface MongoDB extends
  DeviceAdder,
  DeviceGetter 
{}
export interface DeviceApiInterface extends
  AddDevice,
  GetDevice,
  UpdateDevice
{}
export interface AddDevice {
  addDevice(
    opts?: {
      id?: string,
      name?: string,
      macAddress?:string,
      token?:string,
      role?:number,
    }
  ): Promise<Device>
}

export interface GetDevice {
  getDevice(
    id:string
  ):Promise<Device>
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
      macAddress: string,
      token:string,
      role:number,
    }
  ):Promise<Device> {
    // const validToken = validateDeviceToken(opts.token)
    console.log(opts)
    const device = await this.mongodb.addDevice(opts)
    return device;
  }

  public async getDevice(
    id: string
  ):Promise<Device> {
    const device = await this.mongodb.getDeviceById(id)
    return device;
  }
}
