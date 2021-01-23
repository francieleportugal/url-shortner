import express, { Express } from 'express';
const router = require('./routes/index');

class App {
  public express: Express;

  constructor () {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    this.express.use('/', router);
  }
}
export default new App().express;