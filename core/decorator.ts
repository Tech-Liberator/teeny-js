/**
 * This file contains the decorators used to define metadata for controllers,
 * services, and methods in a H3BootApp application.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-11-15
 */
import "reflect-metadata";

/**
 * Decorator that marks a class as a controller. The specified path is used
 * to generate routes for the methods in the class.
 * @param path - The path to use for generating routes.
 * @returns A class decorator that marks the class as a controller.
 */
export function Controller(path: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("path", path, target);
  };
}

/**
 * Decorator that marks a class as a service. The name of the class is used
 * as the service name.
 * @returns A class decorator that marks the class as a service.
 */
export function Service(): ClassDecorator {
  return (target: any) => {
    /**
     * The name of the class is used as the service name.
     */
    const serviceName = target.name;
    Reflect.defineMetadata("serviceName", serviceName, target);
  };
}

/**
 * HTTP Method Decorator for GET requests.
 * This decorator is used to mark a method in a controller class to handle
 * GET requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP GET requests.
 */
export function Get(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'GET'
      Reflect.defineMetadata("method", "GET", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for POST requests.
 * This decorator is used to mark a method in a controller class to handle
 * POST requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP POST requests.
 */
export function Post(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'POST'
      Reflect.defineMetadata("method", "POST", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for PUT requests.
 * This decorator is used to mark a method in a controller class to handle
 * PUT requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP PUT requests.
 */
export function Put(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'PUT'
      Reflect.defineMetadata("method", "PUT", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for PATCH requests.
 * This decorator is used to mark a method in a controller class to handle
 * PATCH requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP PATCH requests.
 */
export function Patch(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'PATCH'
      Reflect.defineMetadata("method", "PATCH", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for DELETE requests.
 * This decorator is used to mark a method in a controller class to handle
 * DELETE requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP DELETE requests.
 */
export function Delete(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'DELETE'
      Reflect.defineMetadata("method", "DELETE", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for CONNECT requests.
 * This decorator is used to mark a method in a controller class to handle
 * CONNECT requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP CONNECT requests.
 */
export function Connect(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'CONNECT'
      Reflect.defineMetadata("method", "CONNECT", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for OPTIONS requests.
 * This decorator is used to mark a method in a controller class to handle
 * OPTIONS requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP OPTIONS requests.
 */
export function Options(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'OPTIONS'
      Reflect.defineMetadata("method", "OPTIONS", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for TRACE requests.
 * This decorator is used to mark a method in a controller class to handle
 * TRACE requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP TRACE requests.
 */
export function Trace(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'TRACE'
      Reflect.defineMetadata("method", "TRACE", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * HTTP Method Decorator for HEAD requests.
 * This decorator is used to mark a method in a controller class to handle
 * HEAD requests for a specific route.
 * 
 * @param route - The route to associate with the method.
 * @returns A method decorator that defines metadata for HTTP HEAD requests.
 */
export function Head(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      // Define metadata for method type as 'HEAD'
      Reflect.defineMetadata("method", "HEAD", target, propertyKey);
      // Define metadata for the route associated with the method
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

/**
 * Parameter Decorator for extracting path parameters from a request.
 * This decorator is used to mark a parameter in a method to indicate that
 * it should be extracted from the path variables of the request.
 * 
 * @param param - The name of the path parameter to extract.
 * @returns A parameter decorator that defines metadata for path parameters.
 */
export function PathParam(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      // Define metadata for the parameter indicating it is a path parameter
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "path", param },
        target,
        propertyKey
      );
    }
  };
}

/**
 * Parameter Decorator for extracting query parameters from a request.
 * This decorator is used to mark a parameter in a method to indicate that
 * it should be extracted from the query string of the request.
 * 
 * @param param - The name of the query parameter to extract.
 * @returns A parameter decorator that defines metadata for query parameters.
 */
export function QueryParam(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      // Define metadata for the parameter indicating it is a query parameter
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "query", param },
        target,
        propertyKey
      );
    }
  };
}

/**
 * Parameter Decorator for extracting the body of a request.
 * This decorator is used to mark a parameter in a method to indicate that
 * it should be extracted from the body of the request.
 * 
 * @returns A parameter decorator that defines metadata for body parameters.
 */
export function BodyParam(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      // Define metadata for the parameter indicating it is a body parameter
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "body" },
        target,
        propertyKey
      );
    }
  };
}

/**
 * Parameter Decorator for extracting the headers of a request.
 * This decorator is used to mark a parameter in a method to indicate that
 * it should be extracted from the headers of the request.
 * 
 * @returns A parameter decorator that defines metadata for headers parameters.
 */
export function RequestHeaders(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      // Define metadata for the parameter indicating it is a headers parameter
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "headers" },
        target,
        propertyKey
      );
    }
  };
}

/**
 * Parameter Decorator for extracting the form data of a request.
 * This decorator is used to mark a parameter in a method to indicate that
 * it should be extracted from the form data of the request.
 * 
 * @param param - The name of the form data parameter to extract.
 * @returns A parameter decorator that defines metadata for form data parameters.
 */
export function FormData(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      // Define metadata for the parameter indicating it is a form data parameter
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "formData", param },
        target,
        propertyKey
      );
    }
  };
}

/**
 * Parameter Decorator for extracting multipart data from a request.
 * This decorator is used to mark a parameter in a method to indicate that
 * it should be extracted from the multipart data of the request.
 * 
 * @param param - The name of the multipart data parameter to extract.
 * @returns A parameter decorator that defines metadata for multipart data parameters.
 */
export function Multipart(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      // Define metadata for the parameter indicating it is a multipart data parameter
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "multipart", param },
        target,
        propertyKey
      );
    }
  };
}
