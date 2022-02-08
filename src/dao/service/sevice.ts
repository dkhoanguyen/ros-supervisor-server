export interface ServiceInterface {
  name: string;
  state: string;
  role: ServiceRole;
}

export enum ServiceRole {
  PureProvider,
  Hybrid,
  PureConsumer,
}