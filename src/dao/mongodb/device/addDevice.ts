import Device from '../../device/device';
import mongoose from "mongoose";
import { DeviceModel } from '../schema/device.schema'

export interface DeviceAdder {
    addDevice: AddDevice
}

export type AddDevice = (newDevice: Device) => Promise<Device>;

export async function addDevice(
    {
        id,
        name,
    }: Device
): Promise<void> {
    const newUser = new DeviceModel(
        {
            id: id,
            name: name,
            created: new Date(new Date().getDate()),
        }
    )
    await newUser.save().then(() => {
        console.log("Saved")
    })
}