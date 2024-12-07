import { existsSync, readdirSync } from "fs";
import { join, extname } from "path";
import { pathToFileURL } from "url";
import { container } from "./dicontainer.js";

export async function registerServices(): Promise<void> {
  const servicesDirectory = join(process.cwd(), "dist", "src", "services");

  if (!existsSync(servicesDirectory)) {
    console.warn("No services directory found.");
    return;
  }

  readdirSync(servicesDirectory).forEach(async (file) => {
    const ext = extname(file);

    if (ext === ".d.ts" || ext === ".map" || ext === ".ts") {
      return; // Skip unnecessary files
    }

    const modulePath = join(servicesDirectory, file);
    const moduleURL = pathToFileURL(modulePath).href;

    try {
      const serviceModule = await import(moduleURL);

      Object.keys(serviceModule).forEach((key) => {
        const serviceClass = serviceModule[key];

        // Check if metadata exists
        const serviceName = Reflect.getMetadata("serviceName", serviceClass);

        if (serviceName) {
          container.register(serviceName, serviceClass);
        }
      });
    } catch (err) {
      console.error(`Failed to load service module ${modulePath}:`, err);
    }
  });
}
