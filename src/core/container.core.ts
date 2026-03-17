import type { Constructor, InjectableCore } from '@core/injectable.core.ts'

type ResolverFactory<T> = (container: ContainerCore) => T

class ContainerCore {
	private readonly singletons = new Map<Constructor, unknown>()
	private readonly factories = new Map<Constructor, ResolverFactory<unknown>>()

	registerSingleton<T>(token: Constructor<T>, factory?: ResolverFactory<T>): this {
		if (!this.factories.has(token)) {
			this.factories.set(token, factory ?? ((container) => container.instantiate(token)))
		}
		return this
	}

	registerValue<T>(token: Constructor<T>, value: T): this {
		this.singletons.set(token, value)
		return this
	}

	resolve<T>(token: Constructor<T>): T {
		if (this.singletons.has(token)) {
			return this.singletons.get(token) as T
		}

		const factory = this.factories.get(token) ?? ((container: ContainerCore) => container.instantiate(token))
		const instance = factory(this) as T
		this.singletons.set(token, instance)
		return instance
	}

	prebind(classes: readonly Constructor[]): void {
		for (const cls of classes) {
			this.registerSingleton(cls)
		}
	}

	boot(classes: readonly Constructor[]): void {
		this.prebind(classes)
		for (const cls of classes) {
			this.resolve(cls)
		}
	}

	reset(): void {
		this.singletons.clear()
		this.factories.clear()
	}

	private instantiate<T>(token: Constructor<T>): T {
		const dependencies: readonly Constructor[] = (token as unknown as InjectableCore).inject ?? []
		return new token(...dependencies.map((dependency) => this.resolve(dependency)))
	}
}

export const container = new ContainerCore()
