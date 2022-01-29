import { Device,NewDevice } from '../../device/device';
import { DeviceModel } from '../schema/device.schema'
import mongoose from 'mongoose';
export interface DeviceAdder {
  addDevice: AddDevice
}

export type AddDevice = (newDevice: NewDevice) => Promise<Device>;

export async function addDevice(
  {
    id,
    name,
  }: NewDevice
): Promise<Device> {
  const newDevice = new DeviceModel(
    {
      id: id,
      name: name,
      created: new Date(new Date().getDate()),
    }
  )
  const doc = await newDevice.save()
  console.log(doc)
  return newDevice
}

export default (): AddDevice => {
  return async (newDevice) => {
    return addDevice(newDevice);
  };
}