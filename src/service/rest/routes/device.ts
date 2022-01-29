import express from 'express'
import { api } from '../../../api';
import { handler } from '../handler'

export function makeDeviceRoute(
  dependencies: {
    device: api.DeviceApiInterface
  }
): express.Router {
  const router = express.Router()
  router.post('/', handler.addDevice(dependencies.device))
  return router
}