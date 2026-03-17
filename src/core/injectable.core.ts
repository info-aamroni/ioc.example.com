export type Constructor<T = unknown> = new (...args: any[]) => T

export interface InjectableCore {
	inject?: readonly Constructor[]
}
