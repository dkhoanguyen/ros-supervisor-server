export interface DeviceInterface {
  id: string
  name: string
  created: Date
}

export type NewDevice = Partial<Omit<
  DeviceInterface,
  'created'
>>;

export class Device implements DeviceInterface {
  id: string;
  name: string;
  created: Date;

  constructor(id: string, name: string, created: Date) {
    this.id = id;
    this.name = name;
    this.created = created;
  }
}