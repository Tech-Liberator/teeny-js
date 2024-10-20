import * as path from "path";
import { pathToFileURL } from "url";

export interface Config {
  app: App;
}

export interface App {
  port: number;
}

export const loadConfig = async (): Promise<Config> => {
  const configPath = path.resolve(process.cwd(), "dist", "zephyr.config.js");

  // Use dynamic import with file:// URL for Windows compatibility
  const configURL = pathToFileURL(configPath).href;
  // Use dynamic import for ESM modules
  const config = (await import(configURL)).default;
  
  return config;
};
