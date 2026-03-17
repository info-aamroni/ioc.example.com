import { HttpResponse } from '@core/response.core.ts'
import type { TimezoneDTO } from '@/app/onboard/timezone/timezone.dto.ts'
import { incomingSearchProcessor } from '@/app/onboard/timezone/timezone.helper.ts'
import { TimezoneRepository } from '@/app/onboard/timezone/timezone.repository.ts'

export class TimezoneService {
	/**
	 * Define the service dependencies
	 * @var string[]
	 */
	static inject = [TimezoneRepository] as const

	/**
	 * Create a new service instance
	 * @param repository
	 */
	constructor(private readonly repository: TimezoneRepository) {
		// Your Code Here...
	}

	/**
	 * Process the incoming record request
	 * @param search - Search by title or value (case-insensitive), returns all matching items
	 */
	async invokeRequest(search: string | null) {
		const response = new HttpResponse<TimezoneDTO>()
		const resource = this.repository.processInvokeEndpoint()
		const incoming = incomingSearchProcessor(search, resource)
		await response.fromResource(incoming)
		return await response.process()
	}
}
