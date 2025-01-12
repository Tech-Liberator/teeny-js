import { App, createApp, createRouter, Router, toNodeListener } from "h3";
import { createServer } from "node:http";
import { loadConfig, configerations } from "./configloader.js";
import { generateRoutes } from "./configroutes.js";
import { registerServices } from "./registerservices.js";

/**
 * The NyxApp class is the main class for the application. It creates an App
 * instance and a Router instance and uses the Router in the App. It also
 * provides methods for setting up the app, starting the server, and listening
 * on a specified port.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-11-15
 */
export default class NyxApp {
  private app: App;
  private router: Router;

  /**
   * The constructor for the NyxApp class.
   * It creates an App instance and a Router instance and uses the Router
   * in the App.
   */
  constructor() {
    /**
     * The App instance
     * @see https://h3.surge.sh/docs/api#app
     * @type {App}
     */
    this.app = createApp();

    /**
     * The Router instance
     * @see https://h3.surge.sh/docs/api#router
     * @type {Router}
     */
    this.router = createRouter();

    /**
     * Use the Router in the App.
     * @see https://h3.surge.sh/docs/api#appuse
     */

    this.app.use(this.router);
  }


  /**
   * Sets up the app by loading configurations, registering services, and generating
   * routes. This method should be called before starting the server.
   * @returns {Promise<void>}
   */
  private async setup(): Promise<void> {
    // Load configurations
    await loadConfig();

    // Register services
    await registerServices();

    // Generate routes
    generateRoutes(this.app);
  }

  /**
   * Initialize the app by setting up the routes and services, then start listening
   * on the specified port.
   * @returns {Promise<void>}
   */
  public async init(): Promise<void> {
    // Wait for setup to complete before starting the server
    await this.setup();
    // Start the server and listen on the specified port
    this.listen((port?: number) => {
      // Log the port number that the server is listening on
      console.log(`Nyx app running on port ${port}`);
    });
  }

  /**
   * Start the server and listen on the specified port.
   * @param {Function} [callback] - An optional callback that will be called when the server is listening.
   * The callback will be passed the port number that the server is listening on.
   */
  private listen(callback?: (port: number) => void): void {
    const applicationPort = configerations?.app.port || 3000; // Use the port from config or fallback
    // Create the server and pass the app as a listener
    createServer(toNodeListener(this.app)).listen(applicationPort);
    // If a callback is provided, call it and pass the port number
    if (callback) {
      callback(applicationPort);
    }
  }
}
