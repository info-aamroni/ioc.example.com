import { defineModule } from '@core/module.core.ts'
import { TimezoneController } from '@/app/onboard/timezone/timezone.controller.ts'
import { TimezoneRepository } from '@/app/onboard/timezone/timezone.repository.ts'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'

export const TimezoneModule = defineModule({
	prefix: '/timezones',
	bindings: [
		{ token: TimezoneRepository, eager: true },
		{ token: TimezoneService, dependencies: [TimezoneRepository], eager: true },
		{ token: TimezoneController, dependencies: [TimezoneService], eager: true },
	],
	middlewares: [async (ctx, next) => {
		ctx.header('x-module-scope', 'timezone')
		await next()
	}],
	routes: [
		{
			method: 'get',
			path: '/',
			middlewares: [async (ctx, next) => {
				ctx.header('x-route-scope', 'timezone.invoke')
				await next()
			}],
			handler: (resolve) => {
				const ctrl = resolve(TimezoneController)
				return async (ctx) => await ctrl.invoke(ctx)
			},
		},
		{
			method: 'get',
			path: '/health',
			middlewares: [async (ctx, next) => {
				ctx.header('x-route-scope', 'timezone.health')
				await next()
			}],
			handler: (resolve) => {
				const ctrl = resolve(TimezoneController)
				return (ctx) => ctrl.health(ctx)
			},
		},
	],
})
