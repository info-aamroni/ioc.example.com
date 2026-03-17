import { defineModule } from '@core/module.core.ts'
import { TimezoneController } from '@/app/onboard/timezone/timezone.controller.ts'
import { TimezoneRepository } from '@/app/onboard/timezone/timezone.repository.ts'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'
import { ExampleMiddleware } from '@/middleware/example.middleware'

export const TimezoneModule = defineModule({
	prefix: '/timezones',
	providers: [TimezoneService, TimezoneRepository],
	controllers: [TimezoneController],
	middlewares: [ExampleMiddleware],
	routes: (router, resolve) => {
		const ctrl = resolve(TimezoneController)

		router.get('/', async (ctx) => await ctrl.invoke(ctx))
		router.get('/{id}', async (ctx) => await ctrl.invoke(ctx))
	},
})
