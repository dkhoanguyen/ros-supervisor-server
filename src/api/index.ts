import DeviceApi, { DeviceApiInterface } from "./device";
import { MongoDBApi} from "../dao/mongodb"

export interface ApiInterface {
    device: DeviceApiInterface
}

export interface ApiOptions {
    mongodb: MongoDBApi
}

export async function makeApi(
    {
        mongodb,
    }:ApiOptions
): Promise<ApiInterface> {
    const deviceApi = new DeviceApi({mongodb})
    return {
        device:deviceApi,
    }
}