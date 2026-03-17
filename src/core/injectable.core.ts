/**
 * Represents a type that can be instantiated with the `new` keyword.
 *
 * This type accepts a generic parameter `T` that denotes the type of the instance
 * it produces upon instantiation. By default, the type of the instance is `unknown`.
 *
 * @template T - The type of instance created by this constructor.
 * @typeParam T - Specifies the type of the object that the constructor will create.
 */
export type Constructor<T = unknown> = new (...args: any[]) => T

/**
 * Marks a class as injectable so the container can read
 * its constructor param types via reflect-metadata.
 *
 * Required on every class you want the container to auto-wire.
 */
export interface InjectableCore {
	inject?: readonly Constructor[]
}
