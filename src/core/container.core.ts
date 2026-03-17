import type { Constructor, InjectableCore } from '@core/injectable.core.ts'

class ContainerCore {
	private readonly singletons = new Map<Constructor, unknown>()

	resolve<T>(cls: Constructor<T>): T {
		if (this.singletons.has(cls)) {
			return this.singletons.get(cls) as T
		}

		const iterator: readonly Constructor[] = (cls as unknown as InjectableCore).inject ?? []
		const instance = new cls(...iterator.map((dep) => this.resolve(dep)))
		this.singletons.set(cls, instance)
		return instance
	}

	registerValue<T>(cls: Constructor<T>, value: T): this {
		this.singletons.set(cls, value)
		return this
	}

	boot(classes: Constructor[]): void {
		for (const cls of classes) {
			this.resolve(cls)
		}
	}

	reset(): void {
		this.singletons.clear()
	}
}

export const container = new ContainerCore()
