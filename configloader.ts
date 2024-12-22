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

export const loadConfig = async (): Promise<void> => {
  const configPath = path.resolve(process.cwd(), "dist", "zephyr.config.js");

  // Use dynamic import with file:// URL for Windows compatibility
  const configURL = pathToFileURL(configPath).href;
  // Use dynamic import for ESM modules
  const config: Config = (await import(configURL)).default;
  // Update configerations
  if (config) {
    configerations.app = config.app;
    if (config.cors) {
      configerations.cors = config.cors;
    }
  }
};
