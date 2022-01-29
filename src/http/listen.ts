import {Server as HTTPServer} from 'http';

export class HTTPServerUnknownError extends Error {}
export class HTTPServerAlreadyListening extends Error {}

type ServerAddress = {port: number, address: string};

export type ListenServerOptions = {
  port: number;
  host: string;
};

/**
 * Implements a realiable HTTP Server listen that catches a number of common
 * problems and supports a Promise rather than callback style.
 */
export default function listen(
  server: HTTPServer,
  {host, port}: ListenServerOptions,
): Promise<ServerAddress> {
  if (server.listening) {
    const address = server.address();

    if (address.port !== port || address.address !== host) {
      // We're listening, but not on the port and/or address that we wanted
      const actual = `${address.address}:${address.port}`;

      throw new HTTPServerAlreadyListening(
        `HTTP Server was already listening on a different host/port. It is listening on ${actual} but you wanted ${host}:${port}`
      );
    }
    // We're listening on the Port and Host that we wanted, so this is fine.
    return Promise.resolve(address);
  }


  let listenErrorHandler: (err: Error) => void;

  const listenError = new Promise<ServerAddress>((resolve, reject) => {
    listenErrorHandler = (err: Error): void => {
      reject(err);
    };

    server.once('error', listenErrorHandler);
  });

  const listen = new Promise<ServerAddress>((resolve, reject) => {
    server.listen({port, host}, () => {
      server.removeListener('error', listenErrorHandler)

      const address = getServerAddress(server);

      if (address === undefined) {
        // We're somehow connected WITHOUT an address. This should never happen
        reject(new HTTPServerUnknownError('HTTP Server appears to be listening but has no address'));
        return;
      }

      resolve(address);
    });
  });

  return Promise.race([
    listenError,
    listen,
  ]);
}

/**
 * Return the HTTP server address if it's listening, otherwise it will return undefined
 */
const getServerAddress = (server: HTTPServer): ServerAddress | undefined => {
  const address = server.address();

  if (address === null) {
    // The server isn't connected yet or has been closed.
    return undefined;
  }

  if (typeof address === 'string') {
    // We're listening on a unix socket. We don't really handle this case properly right now as
    // we only listen host/port combos.
    return {address, port: 0}
  }

  return address;
}
