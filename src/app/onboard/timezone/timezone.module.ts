import type { IModule, Resolve } from '@core/module.core.ts'
import { defineModule } from '@core/module.core.ts'
import { OpenAPIHono } from '@hono/zod-openapi'
import type { Context, Env } from 'hono'
import { TimezoneController } from '@/app/onboard/timezone/timezone.controller.ts'
import { InvokeRouteDocument } from '@/app/onboard/timezone/timezone.document.ts'
import { TimezoneRepository } from '@/app/onboard/timezone/timezone.repository.ts'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'
import { validationHook } from '@/utils/extra/logger.util.ts'

export const TimezoneModule: IModule = defineModule({
	providers: [TimezoneService, TimezoneRepository],
	controllers: [TimezoneController],
	routes: (resolve: Resolve) => {
		const ctrl: TimezoneController = resolve(TimezoneController)
		const hono: OpenAPIHono = new OpenAPIHono<Env>({
			defaultHook: validationHook,
		})

		// middleware scope

		hono.openapi(InvokeRouteDocument, async (ctx: Context) => await ctrl.invoke(ctx))
		return hono
	},
})
