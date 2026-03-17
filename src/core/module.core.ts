import type { MiddlewareHandler } from 'hono'
import { Hono } from 'hono'
import type { Constructor } from '@core/injectable.core.ts'

export type Resolve = <T>(cls: Constructor<T>) => T

export interface IModule {
	prefix: string
	providers: Constructor[]
	controllers: Constructor[]
	middlewares?: MiddlewareHandler[]
	routes: (router: Hono, resolve: Resolve) => void
}

export function defineModule(mod: IModule): IModule {
	return mod
}