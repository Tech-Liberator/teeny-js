import {
  App,
  createApp,
  createRouter,
  defineEventHandler,
  Router,
  toNodeListener,
} from "h3";
import { createServer } from "node:http";
import { Config, loadConfig } from "./configloader.js";
import { generateRoutes } from "./configroutes.js";
import { registerServices } from "./registerservices.js";

export default class H3App {
  private app: App;
  private router: Router;
  private config: Config | undefined;

  constructor() {
    this.app = createApp();
    this.router = createRouter();

    this.app.use(this.router);

    // Automatically register services for dependency injection
    registerServices().then(() => {
      // Automatically generate routes based on API files
      generateRoutes(this.app);
    });
  }

  public init = async () => {
    // Load configeration file
    this.config = await loadConfig();
    this.listen((port?: number) => {
      console.log(`Zephyr app running on port ${port}`);
    });
  };

  private listen(callback?: (port: number) => any): any {
    const finalPort = this.config?.app.port || 3000; // Use the port from config or fallback
    createServer(toNodeListener(this.app)).listen(finalPort);
    if (callback) {
      callback(finalPort);
    }
  }
}
