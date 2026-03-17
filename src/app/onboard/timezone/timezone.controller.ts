import type { Context } from 'hono'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'

export class TimezoneController {
	constructor(private readonly timezoneService: TimezoneService) {}

	invoke = async (ctx: Context) => {
		const resolved: string | null = ctx.req.query().search
		const response = await this.timezoneService.invokeRequest(resolved)
		return ctx.json(response.data)
	}
}
