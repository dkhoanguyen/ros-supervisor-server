import express from 'express'
import { ApiInterface } from '../../../api';
import {makeDeviceRoute} from './device'

export function mountRoutes(
  dependencies: ApiInterface,
  app: express.Express,
): express.Express {
  app.use(express.json())
  // Mount routes
  app.use('/api/v1/devices',makeDeviceRoute(dependencies))
  return app
}