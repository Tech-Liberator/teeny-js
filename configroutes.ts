import {
  assertMethod,
  createRouter,
  defineEventHandler,
  getQuery,
  getRequestHeaders,
  getRouterParam,
  H3Event,
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
import { createResponse, defaultMessages, isResponseEntity } from "./utils.js";
import { HttpStatus } from "./enums.js";
import { Response } from "./types.js";

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
      Object.keys(apiModule).forEach((key) => {
        const apiClass = new apiModule[key]();
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
                const headers: RequestHeaders = getRequestHeaders(event);
                const args = await getMethodArguments(
                  apiClass,
                  methodName,
                  event,
                  headers
                );
                const result = await method.apply(apiClass, args);
                // Check if the result is already a ResponseEntity, return it directly if true
                if (isResponseEntity(result)) {
                  if (result.headers) {
                    setResponseHeaders(event, result.headers);
                  }
                  setResponseStatus(event, result.status, result.message);
                  // Strip away the `headers` property for the `Response` type
                  const response: Response = {
                    status: result.status,
                    message: result.message,
                    body: result.body,
                  };
                  return response;
                }

                // Handle empty result or null value (No Content)
                if (result) {
                  setResponseStatus(
                    event,
                    HttpStatus.OK,
                    defaultMessages[HttpStatus.OK]
                  );
                  return createResponse(
                    HttpStatus.OK,
                    defaultMessages[HttpStatus.OK],
                    result
                  );
                } else {
                  setResponseStatus(
                    event,
                    HttpStatus.NO_CONTENT,
                    defaultMessages[HttpStatus.NO_CONTENT]
                  );
                  return createResponse(
                    HttpStatus.NO_CONTENT,
                    defaultMessages[HttpStatus.NO_CONTENT],
                    null
                  );
                }
              } catch (error: any) {
                setResponseStatus(
                  event,
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  error.message ||
                    defaultMessages[HttpStatus.INTERNAL_SERVER_ERROR]
                );
                return createResponse(
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  error.message ||
                    defaultMessages[HttpStatus.INTERNAL_SERVER_ERROR],
                  null
                );
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

async function getMethodArguments(
  target: any,
  methodName: string,
  event: H3Event,
  headers: RequestHeaders
) {
  const params: any[] = [];
  for (let i = 0; Reflect.hasMetadata(`param-${i}`, target, methodName); i++) {
    const metadata = Reflect.getMetadata(`param-${i}`, target, methodName);
    if (metadata.type === "path") {
      params.push(getRouterParam(event, metadata.param));
    } else if (metadata.type === "query") {
      const query = getQuery(event);
      params.push(query[metadata.param]);
    } else if (metadata.type === "body") {
      const body = await readBody(event);
      params.push(body);
    } else if (metadata.type === "formData") {
      const formData = await readFormData(event);
      params.push(formData);
    } else if (metadata.type === "multipart") {
      const multipartDate = await readMultipartFormData(event);
      params.push(multipartDate);
    } else if (metadata.type === "headers") {
      params.push(headers);
    }
  }
  return params;
}
