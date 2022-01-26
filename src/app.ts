export async function start(
    host: string,
    port: number,
  ): Promise<void>{
    /**
     * Setup our shared concerns first
     */
    const config = getConfigFromEnvironment(process.env);
  
    const log = makeLog({
      mode: config.LOG_MODE,
      shouldDisableExitLogger: config.LOG_DISABLE_EXIT_LOGGER,
    });
  
    const postgres = await makePostgres(config, log);
    const storage = await makeStorage(config);
    const redis = await makeRedis({
      ...config,
  
      PUB_PATTERNS: '*', // TODO
      SUB_PATTERNS: [
        'user:*',
        'organization:*',
        'project:*',
        'device:*',
        'internal:*',
        'processor:*',
        'processor.*',
      ]
    }, log);
  
    const elasticsearch = makeElasticsearch(config, process.env.NODE_ENV || 'dev');
    const deviceManager =  new BalenaDeviceManager(config.BALENA.applicationName, log)
    await deviceManager.login(config.BALENA.apiKey)
  
    const firebase = new Firebase(
      config,
      {postgres, log},
    );
  
    const notification = new Notification(config.TWILIO, log);
  
    const videoManager = new StandardAlertVideoManager(
      {
        inputBucket: config.APPDATA_BUCKET,
        inputPath: 'videos/',
        outputBucket: config.APPDATA_BUCKET,
      },
      {
        postgres,
        redis,
        storage,
        log,
      },
    );
  
    const httpClient = axios.create();
  
    const api = await makeApi({
      firebaseDynamicLinks: config.FIREBASE_DYNAMIC_LINKS,
      notification,
      elasticsearch,
      postgres,
      storage,
      redis,
      firebase,
      deviceManager,
      videoManager,
      log,
      httpClient
    })
  
    /**
     * Setup our networked services
     */
    const server = createServer();
    const restApp = await makeRest({
      useContentSecurityPolicy: config.USE_CONTENT_SECURITY_POLICY,
      log: log.child({service: 'rest'}),
      api
    });
    const deviceWS = new DeviceWebsocketApp(api.auth.authDevice, api, log.child({service: 'deviceWS'}));
    const graphqlApp = new GraphQLApp({
      log: log.child({service: 'graphql'}),
      useContentSecurityPolicy: config.USE_CONTENT_SECURITY_POLICY,
      authoriser: api.auth,
      videoManager,
      api,
    });
  
    // TODO(rolly) catch signals and perform graceful shutdowns on rest, ws, and server
  
    // Handle a client request to upgrade a normal http session to a
    // websocket one. We route the upgrade to any of the apps that support
    // Websockets by matching on the pathname. This is a bit limited but
    /// works for our curent use cases.
    server.on('upgrade', (req, socket, head) => {
      const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  
      switch (pathname) {
        case '/graphql':
          graphqlApp.handleUpgrade(req, socket, head);
          break;
  
        case '/device':
          deviceWS.handleUpgrade(req, socket, head);
          break;
  
        default:
          socket.destroy();
      }
    });
  
    // Route http requests to invidual apps based on url path
    // name prefixes.
    server.on('request', (
      req: IncomingMessage,
      res: ServerResponse,
    ): any => {
      const { pathname } = new URL(req.url || '', `http://${req.headers.host}`);
  
      // TODO(rolly) should we support versioning under each of these top level prefixes?
      //             i.e. `/graphql/v1.2.3/*` or `/api/v1.2.3/*`
  
      switch (true) {
        case pathname === '/graphql':
          log.info({pathname}, "Handle graphql request");
          return graphqlApp.handleRequest(req, res);
  
        case pathname.startsWith('/api'):
          log.info({pathname}, "Handle rest request");
          return restApp(req, res);
  
        default:
          res.writeHead(404);
          res.end('Not Found');
      }
    });
  
    const serviceRoutes = {
      '/graphql': 'graphql',
      '/device': 'device websocket',
      '/api': 'rest api',
    };
  
    const {address, port: actualPort} = await listen(server, {host, port});
    log.info({port: actualPort, host: address, serviceRoutes}, "Listening");
  }
  