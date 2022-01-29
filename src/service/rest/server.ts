import express from 'express';
import { ApiInterface } from '../../api';
import { makeExpressApp } from '../../http/createExpressApp';
import { mountRoutes } from './routes/mountRoutes';

interface RestOptions {
  api: ApiInterface,
}

export async function makeRest({
    api,
  }: RestOptions
): Promise<express.Express> {
  const app = makeExpressApp(true);
  mountRoutes(api,app)
  return app
}