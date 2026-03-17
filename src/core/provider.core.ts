import { OpenAPIHono } from '@hono/zod-openapi'
import { container } from './container.core.ts'
import type { IModule } from './module.core.ts'
import { validationHook } from '@/utils/extra/logger.util.ts'

export abstract class ProviderCore {
	/**
	 * Define all modules this provider is responsible for.
	 * The parent reads this automatically — no super() call needed.
	 *
	 * @example
	 * export class OnboardProvider extends ProviderCore {
	 *   modules() {
	 *     return [LanguageModule, TimezoneModule]
	 *   }
	 * }
	 *
	 * // index.ts
	 * OnboardProvider.register(app, '/:version')
	 */
	protected abstract modules(): IModule[]

	/**
	 * Static entry point — instantiates the subclass, reads its modules(),
	 * and mounts everything onto the app.
	 */
	static register(this: new () => ProviderCore, app: OpenAPIHono, prefix = '/'): void {
		new this().boot(app, prefix)
	}

	/**
	 * Register all modules and attach the resulting router to the parent app
	 */
	private boot(app: OpenAPIHono, prefix: string): void {
		const module = this.modules()
		const router = new OpenAPIHono({ defaultHook: validationHook })

		for (const each of module) {
			container.boot([...each.providers, ...each.controllers])
			const resolve = each.routes((cls) => container.resolve(cls))
			router.route('/', resolve)
		}

		app.route(prefix, router)
	}
}
