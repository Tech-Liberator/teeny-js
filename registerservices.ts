/**
 * This file contains the code for registering services in the dependency injection container.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-12-25
 */

import { existsSync, readdirSync } from "fs";
import { join, extname } from "path";
import { pathToFileURL } from "url";
import { container } from "./dicontainer.js";

/**
 * Registers all services in the dependency injection container by loading the
 * services directory.
 *
 * @returns {Promise<void>} A promise that resolves when all services have been
 * registered.
 */
export async function registerServices(): Promise<void> {
  const servicesDirectory = join(process.cwd(), "dist", "src", "services");

  if (!existsSync(servicesDirectory)) {
    console.warn("No services directory found.");
    return;
  }

  // Iterate over all files in the services directory
  readdirSync(servicesDirectory).forEach(async (file) => {
    const ext = extname(file);

    // Skip unnecessary files
    if (ext === ".d.ts" || ext === ".map" || ext === ".ts") {
      return;
    }

    const modulePath = join(servicesDirectory, file);
    const moduleURL = pathToFileURL(modulePath).href;

    try {
      // Import the service module
      const serviceModule = await import(moduleURL);

      // Iterate over all exports of the service module
      Object.keys(serviceModule).forEach((key) => {
        const serviceClass = serviceModule[key];

        // Check if the service has a name
        const serviceName = Reflect.getMetadata("serviceName", serviceClass);

        if (serviceName) {
          // Register the service with the dependency injection container
          container.register(serviceName, serviceClass);
        }
      });

    } catch (err) {
      console.error(`Failed to load service module ${modulePath}:`, err);
    }
  });
}
