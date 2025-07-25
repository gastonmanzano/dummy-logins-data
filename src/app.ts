import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import connectDB from '../database';
import routes from './Routes';


dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

class Application {
  app: express.Application;
  port: string;
  routes;
  cors;
  server: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.routes = routes;
    this.cors = cors({
      exposedHeaders: 'Authorization',
    });
    this.server = createServer(this.app);

  }

  start(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.cors);

    this.app.use('/api', this.routes);

    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);

      //DB connection.
      connectDB();
    });
  }
}

export default Application;
