import { Hono } from 'hono'
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
	routes: (resolve) => {
		const ctrl = resolve(TimezoneController)
		const router = new Hono()

		// middleware scope
		router.get('/', async (ctx) => await ctrl.invoke(ctx))
		return router
	},
})
