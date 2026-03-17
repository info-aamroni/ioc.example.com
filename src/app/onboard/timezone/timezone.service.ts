import { incomingSearchProcessor } from '@/app/onboard/timezone/timezone.helper.ts'
import { TimezoneRepository } from '@/app/onboard/timezone/timezone.repository.ts'

export class TimezoneService {
	static inject = [TimezoneRepository] as const

	constructor(private readonly repository: TimezoneRepository) {}

	async invokeRequest(search: string | null) {
		const resource = this.repository.processInvokeEndpoint()
		const incoming = incomingSearchProcessor(search, resource)
		return {
			code: 200,
			data: incoming,
		}
	}
}
