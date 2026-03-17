import { makeTimezoneObject } from '@/utils/extra/carbon.util.ts'

export class TimezoneRepository {
	/**
	 * Process the invoked endpoint
	 */
	processInvokeEndpoint() {
		// eslint-disable-next-line n/no-unsupported-features/es-builtins
		const timezone: string[] = Intl.supportedValuesOf('timeZone')
		return timezone.map((zone: string) => makeTimezoneObject(zone))
	}
}
