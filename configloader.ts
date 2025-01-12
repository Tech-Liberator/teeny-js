/**
 * This file contains the code for loading the configuration for the application.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-11-15
 */

import { H3CorsOptions, HTTPMethod } from "h3";
import * as path from "path";
import { pathToFileURL } from "url";

export interface Config {
  app: App;
  cors: Cors;
}

export interface App {
  port: number;
}

export interface Cors extends H3CorsOptions {
  origin?: "*" | "null" | (string | RegExp)[] | ((origin: string) => boolean);
  methods?: "*" | HTTPMethod[];
  allowHeaders?: "*" | string[];
  exposeHeaders?: "*" | string[];
  credentials?: boolean;
  maxAge?: string | false;
  preflight?: {
    statusCode?: number;
  };
}

export let configerations: Config = {
  app: {
    port: 3000,
  },
  cors: {
    origin: "*",
    methods: "*",
    allowHeaders: "*",
    exposeHeaders: "*",
    credentials: true,
    maxAge: "5",
  },
};

/**
 * Loads the Nyx configuration file.
 * @returns {Promise<void>}
 */
export const loadConfig = async (): Promise<void> => {
  // The path to the configuration file
  const configPath = path.resolve(process.cwd(), "dist", "zephyr.config.js");

  // Use dynamic import with file:// URL for Windows compatibility
  const configURL = pathToFileURL(configPath).href;

  // Use dynamic import for ESM modules
  const config: Config = (await import(configURL)).default;

  // Update the configurations
  if (config) {
    // Update the app configuration
    configerations.app = config.app;

    // Update the CORS configuration if it exists
    if (config.cors) {
      configerations.cors = config.cors;
    }
  }
};
