import mongoose from "mongoose";
import { Schema } from 'mongoose'
import DeviceInterface from '../../device/device'

export const deviceSchema = new Schema<DeviceInterface>({
    id: {type: String, required: true},
    name: {type: String, required: true},
    created: {type: Date, required: true},
})

export const DeviceModel = mongoose.model<DeviceInterface>('User', deviceSchema);