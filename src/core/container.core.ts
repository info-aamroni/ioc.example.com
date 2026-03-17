import type { Binding, Constructor } from '@core/injectable.core.ts'

type ResolverFactory<T> = (container: ContainerCore) => T

type ResolverFactory<T> = (container: ContainerCore) => T

class ContainerCore {
	private readonly singletons = new Map<Constructor, unknown>()
	private readonly factories = new Map<Constructor, ResolverFactory<unknown>>()
	private readonly eagerTokens = new Set<Constructor>()

	register<T>(binding: Binding<T>): this {
		const token = binding.token
		if (this.factories.has(token)) {
			return this
		}
		return this
	}

		const target = binding.useClass ?? token
		const dependencies = binding.dependencies ?? []

		this.factories.set(token, (container) => new target(...dependencies.map((dependency) => container.resolve(dependency))))

		if (binding.eager) {
			this.eagerTokens.add(token)
		}

		return this
	}

	registerMany(bindings: readonly Binding[]): this {
		for (const binding of bindings) {
			this.register(binding)
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

		const factory = this.factories.get(token)
		if (!factory) {
			throw new Error(`Container binding not found for token: ${token.name || 'AnonymousClass'}`)
		}

		const instance = factory(this) as T
		this.singletons.set(token, instance)
		return instance
	}

	boot(): void {
		for (const token of this.eagerTokens) {
			this.resolve(token)
		}
	}

	reset(): void {
		this.singletons.clear()
		this.factories.clear()
		this.eagerTokens.clear()
	}
}

export const container = new ContainerCore()
