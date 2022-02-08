import express from 'express'
import { api } from '../../../api';

type AddDeviceReq = {
  body: {
    id: string,
    name: string,
    macAddress: string,
    token: string
    role:number
  }
}

export function addDevice(dependency: api.AddDevice) {
  return async (req: AddDeviceReq, res: express.Response, next: express.NextFunction) => {
    try {
      const {
        id,
        name,
        macAddress,
        token,
        role
      } = req.body;
      const device = await dependency.addDevice({ id, name, macAddress, token, role })
      return res
        .status(201)
        .send({ device: { id: device.id, name: device.name } });
    } catch (err) {
      next(err);
    }
  }
}

type GetDeviceReq = {
  params: {
    id: string
  }
}

export function getDevice(dependency: api.GetDevice) {
  return async (req: GetDeviceReq, res: express.Response, next: express.NextFunction) => {
    try{
      const id = req.params.id;
      const device = await dependency.getDevice(id);
      res.json(device);
    } catch(err){
      console.log(err);
    }
  }
}

export function updateDevice(dependency: api.UpdateDevice) {

}