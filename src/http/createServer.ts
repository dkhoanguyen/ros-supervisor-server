import http from 'http'

export default function createServer(): http.Server {
  const server = http.createServer();
  server.keepAliveTimeout = 5000;
  server.setTimeout(0);
  return server;
}