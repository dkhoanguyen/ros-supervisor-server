import makeAddDevice,{ AddDevice } from "./device/addDevice";
import connect from "./create";

export interface MongoDBApi {
  addDevice: AddDevice
}

export interface DBConfig {
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
}

export default ({
  DB_HOST: host,
  DB_PORT: port,
  DB_NAME: database,
  DB_USER: user,
  DB_PASSWORD: password,
}: DBConfig
):MongoDBApi => {
  const connection = connect({
    DB_HOST: host,
    DB_PORT: port,
    DB_NAME: database,
  })
  return {
    addDevice: makeAddDevice()
  }
}