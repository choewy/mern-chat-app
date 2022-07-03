import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const initConfigs = {
  appConfig: {
    port: 0,
  },
  mongoConfig: {
    host: '127.0.0.1',
    port: 27017,
    user: '',
    password: '',
    database: 'admin',
  },
};

export class App {
  private app: Application;
  private configs = initConfigs;

  constructor() {
    this.app = express();
    this.readEnvironment();
    this.setGlobalMiddlewares();
    this.setRouters();
  }

  private readEnvironment() {
    ['.env.local'].forEach((path) => {
      dotenv.config({ path });
    });

    this.configs = {
      appConfig: {
        port: Number(process.env.PORT),
      },
      mongoConfig: {
        host: String(process.env.MONGO_HOST),
        port: Number(process.env.MONGO_PORT),
        user: String(process.env.MONGO_USER),
        password: String(process.env.MONGO_PASSWORD),
        database: String(process.env.MONGO_DATABASE),
      },
    };
  }

  private setGlobalMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({ origin: '*', credentials: true }));
  }

  private setRouters() {}

  listen() {
    const { appConfig, mongoConfig } = this.configs;
    const connection = `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
    mongoose
      .connect(connection)
      .then(() => {
        this.app.listen(appConfig.port, () =>
          console.log(`Server running on port ${appConfig.port}`)
        );
      })
      .catch((error) => console.log(error));
  }
}
