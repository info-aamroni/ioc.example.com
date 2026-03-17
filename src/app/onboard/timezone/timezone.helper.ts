import type { TimezoneDTO } from '@/app/onboard/timezone/timezone.dto.ts'

export const incomingSearchProcessor = (value: string | null, items: TimezoneDTO[] | TimezoneDTO) => {
	if (!value) {
		return items
	}
	const iterator = Array.isArray(items) ? items : [items]
	const textCase = value.toLowerCase()
	return iterator.filter(
		(item: TimezoneDTO) => item.title.toLowerCase().includes(textCase) || item.value.toLowerCase().includes(textCase),
	)
}
