import type { Context } from 'hono'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'

export class TimezoneController {
	constructor(private readonly timezoneService: TimezoneService) {}

	async invoke(ctx: Context) {
		const response = this.timezoneService.invokeRequest()
		console.log(response)
		return ctx.json({data: 'work'})
	}


	health(ctx: Context) {
		return ctx.json({
			status: 'ok',
			module: 'timezone',
		})
	}
}
