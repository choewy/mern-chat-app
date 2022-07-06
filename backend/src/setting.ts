import express, { Application } from 'express';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import controllers from './controllers';

const settings = (app: Application) => [
  () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: '*', credentials: true }));
    app.use(express.static('public'));
    app.use('/images', express.static('images'));
  },
  () => {
    controllers().forEach((route) => {
      const { prefix, router } = route;
      app.use(prefix, router);
    });
  },
  () => {
    const { port, mongo } = config;
    const authorization = `${mongo.user}:${mongo.password}`;
    const location = `${mongo.host}:${mongo.port}`;
    const connection = `mongodb://${authorization}@${location}/${mongo.database}`;
    mongoose
      .connect(connection)
      .then(() => {
        const log = `Server running on port ${port}`;
        app.listen(port, () => console.log(log));
      })
      .catch((error) => console.log(error));
  },
];

export default settings;
