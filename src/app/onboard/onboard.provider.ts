import type { IModule } from '@core/module.core.ts'
import { ProviderCore } from '@core/provider.core.ts'
import { TimezoneModule } from '@/app/onboard/timezone/timezone.module.ts'

export class OnboardProvider extends ProviderCore {
	/**
	 * Define all modules this provider is responsible for
	 * @protected
	 * @returns {IModule[]}
	 */
	protected modules(): IModule[] {
		return [TimezoneModule]
	}
}
