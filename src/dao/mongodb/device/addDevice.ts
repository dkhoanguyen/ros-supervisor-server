import { Device,NewDevice } from '../../device/device';
import { DeviceModel } from '../schema/device'

export interface DeviceAdder {
  addDevice: AddDevice
}

export type AddDevice = (newDevice: NewDevice) => Promise<Device>;

export async function addDevice(
  {
    id,
    name,
    macAddress,
    token,
    role
  }: NewDevice
): Promise<Device> {
  const newDevice = new DeviceModel(
    {
      id: id,
      name: name,
      macAddress: macAddress,
      token: token,
      role: role,
      created: new Date(new Date().getDate()),
    }
  )
  await newDevice.save()
  return Device.fromInterface(newDevice)
}

export default (): AddDevice => {
  return async (newDevice) => {
    return addDevice(newDevice);
  };
}