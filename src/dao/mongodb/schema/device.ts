import mongoose from "mongoose";
import { Schema } from 'mongoose'
import { DeviceInterface } from '../../device/device'

export const deviceSchema = new Schema<DeviceInterface>({
    id: { type: String, required: true },
    token: { type: String, required: true },
    name: { type: String, required: true },
    created: { type: Date, required: true },
    macAddress: { type: String, required: true },
    role: { type: Number, required: true},
})

export const DeviceModel = mongoose.model<DeviceInterface>('Device', deviceSchema);