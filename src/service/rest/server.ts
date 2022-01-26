import express from 'express';
import { makeExpressApp } from '../../http/createExpressApp';

export async function makeRest(
): Promise<express.Express> {
    const app = makeExpressApp(true);
    return app
}