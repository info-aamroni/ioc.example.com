import { defineModule } from '@core/module.core.ts'
import { TimezoneController } from '@/app/onboard/timezone/timezone.controller.ts'
import { TimezoneRepository } from '@/app/onboard/timezone/timezone.repository.ts'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'

export const TimezoneModule = defineModule({
	prefix: '/timezones',
	providers: [TimezoneService, TimezoneRepository],
	controllers: [TimezoneController],
	middlewares: [async (ctx, next) => {
		ctx.header('x-module-scope', 'timezone')
		await next()
	}],
	routes: (router, resolve) => {
		const ctrl = resolve(TimezoneController)
		router.get('/', async (ctx) => await ctrl.invoke(ctx))
	},
})
