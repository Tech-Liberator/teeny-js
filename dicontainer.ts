import { OnDestroy, OnInit } from "./types.js";

type Constructor<T = any> = new (...args: any[]) => T;

class DIContainer {
  private dependencies = new Map<
    string,
    { ctor: Constructor; singleton: boolean; scope: string }
  >();
  private instances = new Map<string, any>();
  private scopedInstances = new Map<string, any>();

  register<T>(
    name: string,
    ctor: Constructor<T>,
    isSingleton = false,
    scope: string = "singleton"
  ) {
    this.dependencies.set(name, { ctor, singleton: isSingleton, scope });
    if (isSingleton) {
      this.instances.set(name, null);
    }
    if (scope === "scoped") {
      this.scopedInstances.set(name, null);
    }
  }

  resolve<T>(name: string): T {
    const service = this.dependencies.get(name);

    if (!service) {
      throw new Error(`Dependency ${name} not found`);
    }

    const { ctor, singleton, scope } = service;

    if (scope === "scoped") {
      if (!this.scopedInstances.has(name)) {
        this.scopedInstances.set(name, this.instantiate(ctor));
      }
      return this.scopedInstances.get(name);
    }

    if (singleton) {
      if (!this.instances.get(name)) {
        const instance = this.instantiate(ctor);
        this.instances.set(name, instance);
      }
      return this.instances.get(name);
    }

    return this.instantiate(ctor);
  }

  private instantiate<T extends object>(ctor: Constructor<T>): T {
    const params = Reflect.getMetadata("design:paramtypes", ctor) || [];
    const injections = params.map((param: any) => this.resolve(param.name));
    const instance = new ctor(...injections);

    if ("onInit" in instance) {
      (instance as OnInit).onInit();
    }

    return instance;
  }

  // Clear scoped services (e.g., at the end of a request)
  clearScopedServices() {
    for (const instance of this.scopedInstances.values()) {
      if ("onDestroy" in instance) {
        (instance as OnDestroy).onDestroy();
      }
    }
    this.scopedInstances.clear();
  }
}

export const container = new DIContainer();
