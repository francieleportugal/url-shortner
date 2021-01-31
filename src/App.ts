import express, { Express } from 'express';
import router from './routes';

class App {
  public express: Express;

  constructor () {
    this.express = express();
    this.useRequest();
    this.mountRoutes();
    this.setSettings();
  }

  private useRequest(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private mountRoutes (): void {
    this.express.use('/', router);
  }

  private setSettings() {
    this.express.set('view engine', 'ejs');
    this.express.set('views','src/app/views');
  }
}

export default new App().express;