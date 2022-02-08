"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPServerAlreadyListening = exports.HTTPServerUnknownError = void 0;
class HTTPServerUnknownError extends Error {
}
exports.HTTPServerUnknownError = HTTPServerUnknownError;
class HTTPServerAlreadyListening extends Error {
}
exports.HTTPServerAlreadyListening = HTTPServerAlreadyListening;
/**
 * Implements a realiable HTTP Server listen that catches a number of common
 * problems and supports a Promise rather than callback style.
 */
function listen(server, { host, port }) {
    // if (server.listening) {
    //   const address = server.address();
    //   // We're listening on the Port and Host that we wanted, so this is fine.
    //   return Promise.resolve(address);
    // }
    console.log("Heyy");
    let listenErrorHandler;
    const listenError = new Promise((resolve, reject) => {
        listenErrorHandler = (err) => {
            reject(err);
        };
        server.once('error', listenErrorHandler);
    });
    const listen = new Promise((resolve, reject) => {
        server.listen({ port, host }, () => {
            server.removeListener('error', listenErrorHandler);
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
exports.default = listen;
/**
 * Return the HTTP server address if it's listening, otherwise it will return undefined
 */
const getServerAddress = (server) => {
    const address = server.address();
    if (address === null) {
        // The server isn't connected yet or has been closed.
        return undefined;
    }
    if (typeof address === 'string') {
        // We're listening on a unix socket. We don't really handle this case properly right now as
        // we only listen host/port combos.
        return { address, port: 0 };
    }
    return address;
};
