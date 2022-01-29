import express from 'express'
import { api } from '../../../api';
import { handler } from './index';

type AddDeviceReq = {
  body: {
    id: string,
    name: string,
  }
}

export function addDevice(dependency: api.AddDevice) {
  return async (req: AddDeviceReq, res: handler.Response, next: express.NextFunction) => {
    try {
      const { id, name } = req.body;
      const device = await dependency.addDevice({id,name})
      return res
        .status(201)
        .send({ device: { id: device.id, name: device.name, created: device.created } });
    } catch (err) {
      next(err);
    }
  }
}