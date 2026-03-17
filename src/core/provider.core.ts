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

		for (const mod of this.modules()) {
			const moduleRouter = new Hono()
			container.boot([...mod.providers, ...mod.controllers])

			for (const middleware of mod.middlewares ?? []) {
				moduleRouter.use('*', middleware)
			}

			mod.routes(moduleRouter, (cls) => container.resolve(cls))
			router.route(mod.prefix, moduleRouter)
		}

		app.route(prefix, router)
	}
}
