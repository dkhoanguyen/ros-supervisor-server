import { ServiceInterface } from '../service/sevice'

export interface DeviceInterface {
  id: string
  token: string
  macAddress: string
  name: string
  created: Date
  role: DeviceRole
  updateRate: number
  services: ServiceInterface[]
}

export enum DeviceRole {
  Orchestrator,
  Player,
}

export type NewDevice = Partial<Omit<
  DeviceInterface,
  'created' |
  'services' |
  'updateRate'>>;

export class Device implements DeviceInterface {
  id: string;
  token: string;
  macAddress: string;
  name: string;
  created: Date;
  role: DeviceRole;
  updateRate: number;
  services: ServiceInterface[];

  static fromInterface(data: DeviceInterface){
    return new this(
      data.id,
      data.name,
      data.created,
      data.token,
      data.macAddress,
      data.role
    )
  }

  constructor(id: string, name: string, created: Date, token: string, macAddress: string, role: number) {
    this.id = id;
    this.name = name;
    this.created = created;
    this.token = token;
    this.macAddress = macAddress;
    this.role = role;
    this.updateRate = 0;
    this.services = new Array<ServiceInterface>();
  }


  public updateDevice(device: DeviceInterface) {
    this.id = device.id;
    this.name = device.name;
  }
}