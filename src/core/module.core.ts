import type { MiddlewareHandler } from 'hono'
import { Hono } from 'hono'
import type { Binding, Constructor } from '@core/injectable.core.ts'

export type Resolve = <T>(cls: Constructor<T>) => T

export interface IModule {
	prefix: string
	bindings: Binding[]
	middlewares?: MiddlewareHandler[]
	routes: (resolve: Resolve) => Hono
}

export function defineModule(mod: IModule): IModule {
	return mod
}
