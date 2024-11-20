import "reflect-metadata";
import { ServiceOptions } from "./types.js";

export function Controller(path: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("path", path, target);
  };
}

export function Service(options: ServiceOptions = {}): ClassDecorator {
  return (target: any) => {
    const serviceName = options.name || target.name; // Use alias or class name
    const singleton = options.singleton || false;
    const scope = options.scope || "singleton";
    Reflect.defineMetadata("serviceName", serviceName, target);
    Reflect.defineMetadata("singleton", singleton, target);
    Reflect.defineMetadata("scope", scope, target);
  };
}

// HTTP Method Decorators
export function Get(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "GET", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Post(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "POST", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Put(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "PUT", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Patch(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "PATCH", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Delete(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "DELETE", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Connect(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "CONNECT", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Options(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "OPTIONS", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Trace(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "TRACE", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

export function Head(route: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata("method", "HEAD", target, propertyKey);
      Reflect.defineMetadata("route", route, target, propertyKey);
    }
  };
}

// Parameter Decorators
export function PathParam(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "path", param },
        target,
        propertyKey
      );
    }
  };
}

export function QueryParam(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "query", param },
        target,
        propertyKey
      );
    }
  };
}

export function BodyParam(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "body" },
        target,
        propertyKey
      );
    }
  };
}

export function RequestHeaders(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "headers" },
        target,
        propertyKey
      );
    }
  };
}

export function FormData(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "formData", param },
        target,
        propertyKey
      );
    }
  };
}

export function Multipart(param: string): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey !== undefined) {
      Reflect.defineMetadata(
        `param-${parameterIndex}`,
        { type: "multipart", param },
        target,
        propertyKey
      );
    }
  };
}
