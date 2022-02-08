import mongoose from "mongoose";
import { Schema } from 'mongoose'
import { ServiceInterface } from '../../service/sevice'

export const serviceSchema = new Schema<ServiceInterface>({
    name: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: Number, required: true},
})

export const ServiceModel = mongoose.model<ServiceInterface>('Service', serviceSchema);