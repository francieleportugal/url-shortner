import express, { Express } from 'express';
const router = require('./routes/index');

class App {
  public express: Express;

  constructor () {
    this.express = express();
    this.useRequest();
    this.mountRoutes();
  }

  private useRequest(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private mountRoutes (): void {
    this.express.use('/', router);
  }
}
export default new App().express;