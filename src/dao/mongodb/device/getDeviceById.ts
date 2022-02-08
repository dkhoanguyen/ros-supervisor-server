import { Device, DeviceInterface } from '../../device/device';
import { DeviceModel } from '../schema/device'


export interface DeviceGetter {
  getDeviceById: GetDeviceById
}

export type GetDeviceById = (id: string) => Promise<Device>;

export async function getDeviceById(id:string): Promise<Device> {
  let queriedDevice = await DeviceModel.findOne({'id':id}).exec() as DeviceInterface
  const device = Device.fromInterface(queriedDevice)
  return device
}

export default (): GetDeviceById => {
  return async (id) => {
    return getDeviceById(id);
  };
}