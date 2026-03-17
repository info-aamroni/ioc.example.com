import type { TimezoneDTO } from '@/app/onboard/timezone/timezone.dto.ts'

export class TimezoneRepository {
	processInvokeEndpoint(): TimezoneDTO[] {
		// eslint-disable-next-line n/no-unsupported-features/es-builtins
		const timezone: string[] = Intl.supportedValuesOf('timeZone')
		return timezone.map((zone: string) => ({
			title: zone,
			value: zone,
		}))
	}
}
