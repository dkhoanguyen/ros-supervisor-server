import express from 'express'
import helmet from 'helmet';
import cors from 'cors'

export function makeExpressApp(
    useContentSecurityPolicy = true,
  ): express.Express {
    const app = express();
    app.use(cors())
    app.use(helmet({ contentSecurityPolicy: useContentSecurityPolicy ? undefined : false }));
    return app;
  }
