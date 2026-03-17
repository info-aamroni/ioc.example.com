import type { Handler, MiddlewareHandler } from 'hono'
import type { Binding, Constructor } from '@core/injectable.core.ts'

export type Resolve = <T>(cls: Constructor<T>) => T

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head'

export interface ModuleRoute {
	method: HttpMethod
	path: string
	middlewares?: MiddlewareHandler[]
	handler: (resolve: Resolve) => Handler
}

export interface IModule {
	prefix: string
	bindings: Binding[]
	middlewares?: MiddlewareHandler[]
	routes: ModuleRoute[]
}

export function defineModule(mod: IModule): IModule {
	return mod
}
