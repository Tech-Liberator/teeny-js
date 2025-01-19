import { Constructor } from "./types.js";

/**
 * A dependency injection container. Allows registering and resolving dependencies.
 * 
 * @author Sathya Molagoda
 * @version 1.0.0
 * @Created on 2024-12-25
 */
class DIContainer {
  private dependencies = new Map<string, { ctor: Constructor }>();

  /**
   * Registers a dependency with the container.
   * @param {string} name - The name of the dependency.
   * @param {Constructor<T>} ctor - The constructor of the dependency.
   * @returns {void}
   */
  register<T>(name: string, ctor: Constructor<T>) {
    /**
     * Registers a dependency with the container.
     * @param {string} name - The name of the dependency.
     * @param {Constructor<T>} ctor - The constructor of the dependency.
     * @returns {void}
     */
    this.dependencies.set(name, { ctor });
  }

  /**
   * Resolves a dependency with the given name.
   * @param {string} name - The name of the dependency.
   * @returns {T} The resolved dependency.
   * @throws {Error} If the dependency is not found.
   */
  resolve<T>(name: string): T {
    const service = this.dependencies.get(name);
    if (!service) {
      throw new Error(`Dependency ${name} not found`);
    }
    const { ctor } = service;
    return this.instantiate(ctor);
  }

  /**
   * Instantiates a given constructor with its dependencies.
   * @param {Constructor<T>} ctor - The constructor to instantiate.
   * @returns {T} The instantiated object.
   * @private
   */
  private instantiate<T extends object>(ctor: Constructor<T>): T {
    const params = Reflect.getMetadata("design:paramtypes", ctor) || [];
    const injections = params.map((param: any) => this.resolve(param.name));
    const instance = new ctor(...injections);
    return instance;
  }
}

export const container = new DIContainer();
