/**
 * This file contains the code for generating routes for the application based on the exported classes and functions
 * from the 'controller' directory. The routes are generated using the 'h3' library.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-12-25
 */

import {
  createRouter,
  defineEventHandler,
  getQuery,
  getRequestHeaders,
  getRouterParam,
  H3Event,
  handleCors,
  MultiPartData,
  readBody,
  readFormData,
  readMultipartFormData,
  RequestHeaders,
  setResponseHeaders,
  setResponseStatus,
} from "h3";
import { existsSync, readdirSync } from "fs";
import { join, extname } from "path";
import { pathToFileURL } from "url";
import "reflect-metadata";
import { defaultMessages, isResponse } from "./utils.js";
import { HttpStatus } from "./enums.js";
import { Response } from "./types.js";
import { container } from "./dicontainer.js";
import { configerations } from "./configloader.js";


/**
 * Generates routes for the application based on the exported classes and functions
 * from the 'controller' directory.
 * @param app - The app instance to use for generating routes.
 * @returns Nothing.
 */
export function generateRoutes(app: any) {
  const router = createRouter();
  const apiDirectory = join(process.cwd(), "dist", "src", "controller");

  if (!existsSync(apiDirectory)) {
    return;
  }

  // Exclude files that are .d.ts or .map
  readdirSync(apiDirectory).forEach(async (file) => {
    const ext = extname(file);

    // Skip .d.ts and .map files
    if (ext === ".d.ts" || ext === ".map" || ext === ".ts") {
      return;
    }

    const modulePath = join(apiDirectory, file);
    const moduleURL = pathToFileURL(modulePath).href;

    try {
      const apiModule = await import(moduleURL); // Use the file URL for dynamic import

      // Iterate over exported classes or functions
      Object.keys(apiModule).forEach(async (key) => {
        const apiClass = await injectDependencies(apiModule[key]);
        const proto = Object.getPrototypeOf(apiClass);

        // Get the 'path' metadata from the Controller decorator
        const controllerPath = Reflect.getMetadata(
          "path",
          apiClass.constructor
        );

        Object.getOwnPropertyNames(proto).forEach((methodName) => {
          const method = proto[methodName];
          const httpMethod = Reflect.getMetadata(
            "method",
            apiClass,
            methodName
          );
          const route = Reflect.getMetadata("route", apiClass, methodName);

          if (httpMethod && route) {
            const fullRoute = `${controllerPath}${route}`;

            const eventHandler = async (event: H3Event) => {
              try {
                const didHandleCors = handleCors(event, configerations.cors);
                if (didHandleCors) {
                  const headers: RequestHeaders = getRequestHeaders(event);
                  const args = await getMethodArguments(
                    apiClass,
                    methodName,
                    event,
                    headers
                  );
                  const result = await method.apply(apiClass, args);
                  // Check if the result is already a ResponseEntity, return it directly if true
                  if (isResponse(result)) {
                    const response: Response = result;
                    const headers: Record<string, string> = response.headers;
                    if (headers) {
                      setResponseHeaders(event, headers);
                    }
                    const status: HttpStatus = response.status;
                    const message: string = response.message;
                    if (message) {
                      setResponseStatus(event, status, message);
                    } else {
                      setResponseStatus(event, status, defaultMessages[status]);
                    }
                    return response.body;
                  }

                  // Handle empty result or null value (No Content)
                  if (Array.isArray(result)) {
                    if (result.length > 0) {
                      setResponseStatus(
                        event,
                        HttpStatus.OK,
                        defaultMessages[HttpStatus.OK]
                      );
                    } else {
                      setResponseStatus(
                        event,
                        HttpStatus.NO_CONTENT,
                        defaultMessages[HttpStatus.NO_CONTENT]
                      );
                    }
                    return result;
                  } else if (result) {
                    setResponseStatus(
                      event,
                      HttpStatus.OK,
                      defaultMessages[HttpStatus.OK]
                    );
                  } else {
                    setResponseStatus(
                      event,
                      HttpStatus.NO_CONTENT,
                      defaultMessages[HttpStatus.NO_CONTENT]
                    );
                  }
                  return result;
                } else {
                  // Handle CORS failure - Send a structured response with 403 status
                  const errorMessage =
                    "CORS policy violation: Request not allowed";
                  setResponseStatus(event, HttpStatus.FORBIDDEN, errorMessage);
                  return {
                    status: HttpStatus.FORBIDDEN,
                    message: errorMessage,
                    body: null,
                  };
                }
              } catch (error: any) {
                setResponseStatus(
                  event,
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  error.message ||
                    defaultMessages[HttpStatus.INTERNAL_SERVER_ERROR]
                );
                return error;
              }
            };

            // Handle specific HTTP methods explicitly
            switch (httpMethod.toLowerCase()) {
              case "get":
                router.get(fullRoute, defineEventHandler(eventHandler));
                break;
              case "post":
                router.post(fullRoute, defineEventHandler(eventHandler));
                break;
              case "put":
                router.put(fullRoute, defineEventHandler(eventHandler));
                break;
              case "delete":
                router.delete(fullRoute, defineEventHandler(eventHandler));
                break;
              case "patch":
                router.patch(fullRoute, defineEventHandler(eventHandler));
                break;
              case "connect":
                router.connect(fullRoute, defineEventHandler(eventHandler));
                break;
              case "options":
                router.options(fullRoute, defineEventHandler(eventHandler));
                break;
              case "trace":
                router.trace(fullRoute, defineEventHandler(eventHandler));
                break;
              case "head":
                router.head(fullRoute, defineEventHandler(eventHandler));
                break;
              default:
                throw new Error(`Unsupported HTTP method: ${httpMethod}`);
            }
          }
        });
      });
    } catch (err) {
      console.error(`Failed to load module ${modulePath}:`, err);
    }
  });

  app.use(router);
}

/**
 * Extracts method arguments based on metadata defined on the method parameters.
 * Supports extraction from path, query, body, form data, multipart data, and headers.
 * 
 * @param target - The target object containing the method.
 * @param methodName - The name of the method to extract arguments for.
 * @param event - The H3Event instance containing the request information.
 * @param headers - The request headers.
 * @returns A promise that resolves to an array of extracted parameters.
 */
async function getMethodArguments(
  target: any,
  methodName: string,
  event: H3Event,
  headers: RequestHeaders
): Promise<any[]> {
  const params: any[] = [];

  // Iterate over parameter metadata and extract corresponding values
  for (let i = 0; Reflect.hasMetadata(`param-${i}`, target, methodName); i++) {
    const metadata = Reflect.getMetadata(`param-${i}`, target, methodName);

    // Extract path parameter
    if (metadata.type === "path") {
      params.push(getRouterParam(event, metadata.param));
    } 
    // Extract query parameter
    else if (metadata.type === "query") {
      const query = getQuery(event);
      params.push(query[metadata.param]);
    } 
    // Extract body
    else if (metadata.type === "body") {
      const body = await readBody(event);
      params.push(body);
    } 
    // Extract form data
    else if (metadata.type === "formData") {
      const formData: FormData = await readFormData(event);
      if (formData) {
        params.push(formData.get(metadata.param));
      }
    } 
    // Extract multipart data
    else if (metadata.type === "multipart") {
      const multipartData: MultiPartData[] | undefined = await readMultipartFormData(event);
      if (typeof multipartData != "undefined" && multipartData.length > 0) {
        params.push(multipartData.filter((data) => data.name === metadata.param)[0]);
      }
    } 
    // Extract headers
    else if (metadata.type === "headers") {
      params.push(headers);
    }
  }
  
  return params;
}

/**
 * Injects dependencies into the target class by resolving them from the DI container.
 * 
 * @param target - The target class for which dependencies are to be injected.
 * @returns A promise that resolves to an instance of the target class with its dependencies injected.
 */
async function injectDependencies(target: any): Promise<any> {
  // Get the list of dependencies using reflection metadata
  const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];

  // Resolve all dependencies from the DI container
  const resolvedDependencies = await Promise.all(
    dependencies.map(async (dep: any) => {
      try {
        // Attempt to resolve the dependency from the container
        return container.resolve(dep.name);
      } catch (error) {
        // Log an error if the dependency cannot be resolved
        console.error(`Unable to resolve dependency for target ${dep.name}.`);
        console.error(error);
        return null;
      }
    })
  );

  // Create and return an instance of the target class with resolved dependencies
  return new target(...resolvedDependencies);
}
