import type { Context } from 'hono'
import { TimezoneService } from '@/app/onboard/timezone/timezone.service.ts'

export class TimezoneController {
	/**
	 * Define the service dependencies
	 * @var string[]
	 */
	static inject = [TimezoneService] as const

	/**
	 * Create a new controller instance
	 * @param timezoneService
	 */
	constructor(private readonly timezoneService: TimezoneService) {
		// Your Code Here...
	}

	/**
	 * Display all the resource
	 * @param ctx
	 */
	async invoke(ctx: Context) {
		const resolved: string | null = ctx.req.query().search
		const response = await this.timezoneService.invokeRequest(resolved)
		return ctx.json(response.data)
	}
}
