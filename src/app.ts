import { ServerResponse , IncomingMessage } from "http";

import makeMongodb from "./dao/mongodb"
import { makeApi } from "./api"
import createServer from "./http/createServer"
import { makeRest } from "./service/rest/server";
import listen from './http/listen';

export async function start(
  host: string,
  port: number,
): Promise<void> {
  // const config = getConfigFromEnvironment(process.env)
  const config = {
    DB_HOST: host,
    DB_PORT: 27017,
    DB_NAME: "Device",
    DB_USER: "admin",
    DB_PASSWORD: "admin"
  }
  const mongodb = await makeMongodb(config)
  const api = await makeApi({mongodb})
  const server = await createServer()
  const restApp = await makeRest({api})

  server.on('request', (
    req: IncomingMessage,
    res: ServerResponse,
  ): any => {
    const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);
    switch (true) {
      case pathname.startsWith('/api'):
        console.log({pathname}, "Handle rest request");
        return restApp(req, res);

      default:
        res.writeHead(404);
        res.end('Not Found');
    }
  });
  const {address, port: actualPort} = await listen(server, {host, port});
  console.log(address, actualPort)
}

start("localhost",3000)