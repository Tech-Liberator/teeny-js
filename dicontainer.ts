import { Constructor } from "./types.js";

class DIContainer {
  private dependencies = new Map<string, { ctor: Constructor }>();

  register<T>(name: string, ctor: Constructor<T>) {
    this.dependencies.set(name, { ctor });
  }

  resolve<T>(name: string): T {
    const service = this.dependencies.get(name);
    if (!service) {
      throw new Error(`Dependency ${name} not found`);
    }
    const { ctor } = service;
    return this.instantiate(ctor);
  }

  private instantiate<T extends object>(ctor: Constructor<T>): T {
    const params = Reflect.getMetadata("design:paramtypes", ctor) || [];
    const injections = params.map((param: any) => this.resolve(param.name));
    const instance = new ctor(...injections);
    return instance;
  }
}

export const container = new DIContainer();
