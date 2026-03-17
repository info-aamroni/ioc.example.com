import type { Constructor } from '@core/injectable.core.ts'
import type { OpenAPIHono } from '@hono/zod-openapi'

/**
 * A typed resolver passed into your `routes` callback.
 * Resolves any registered class to its singleton instance.
 */
export type Resolve = <T>(cls: Constructor<T>) => T

export interface IModule {
	/** Services, repositories — booted as singletons at startup. */
	providers: Constructor[]
	/** Controllers — booted as singletons, passed into the routes callback. */
	controllers: Constructor[]
	/**
	 * A callback that receives a `resolve` helper and returns a configured
	 * OpenAPIHono router. You own the route wiring — add middleware, group
	 * paths, or split across controllers however you need.
	 *
	 * @example
	 * routes: (resolve) => {
	 *   const ctrl = resolve(LanguageController)
	 *
	 *   return new OpenAPIHono()
	 *     .openapi(ListLanguagesRoute, (ctx) => ctrl.index(ctx))
	 *     .openapi(ShowLanguageRoute,  (ctx) => ctrl.show(ctx))
	 * }
	 *
	 * @example with middleware
	 * routes: (resolve) => {
	 *   const ctrl = resolve(LanguageController)
	 *   const router = new OpenAPIHono()
	 *
	 *   router.use('*', authMiddleware)
	 *   router.openapi(ListLanguagesRoute, (ctx) => ctrl.index(ctx))
	 *
	 *   return router
	 * }
	 */
	routes: (resolve: Resolve) => OpenAPIHono
}

/**
 * Typed identity helper — gives you autocomplete without needing a class.
 *
 * @example
 * export const LanguageModule = defineModule({
 *   providers:   [LanguageRepository, LanguageService],
 *   controllers: [LanguageController],
 *   routes: (resolve) => {
 *     const ctrl = resolve(LanguageController)
 *     return new OpenAPIHono()
 *       .openapi(InitLanguageRouteDocument, (ctx) => ctrl.index(ctx))
 *   },
 * })
 */
export function defineModule(mod: IModule): IModule {
	return mod
}
