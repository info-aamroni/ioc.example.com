import { Hono } from 'hono'
import { container } from './container.core.ts'
import type { IModule } from './module.core.ts'

export abstract class ProviderCore {
	protected abstract modules(): IModule[]

	static register(this: new () => ProviderCore, app: Hono, prefix = '/'): void {
		new this().boot(app, prefix)
	}

	private boot(app: Hono, prefix: string): void {
		const router = new Hono()
		const modules = this.modules()

		for (const mod of modules) {
			container.registerMany(mod.bindings)
		}
		container.boot()

		for (const mod of modules) {
			const moduleRouter = new Hono()

			for (const middleware of mod.middlewares ?? []) {
				moduleRouter.use('*', middleware)
			}

			for (const route of mod.routes) {
				const handlers = [...(route.middlewares ?? []), route.handler((cls) => container.resolve(cls))]
				moduleRouter.on([route.method.toUpperCase()], route.path, ...(handlers as [any, ...any[]]))
			}

			router.route(mod.prefix, moduleRouter)
		}

		app.route(prefix, router)
	}
}
