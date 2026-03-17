export type Constructor<T = unknown> = new (...args: any[]) => T

export interface Binding<T = unknown> {
	token: Constructor<T>
	useClass?: Constructor<T>
	dependencies?: Constructor[]
	eager?: boolean
}
