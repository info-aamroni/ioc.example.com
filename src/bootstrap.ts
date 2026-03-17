import { Hono } from 'hono'
import { OnboardProvider } from '@/app/onboard/onboard.provider.ts'

export function bootstrapApplication(): Hono {
	const app = new Hono()

	OnboardProvider.register(app, '/api')

	app.get('/', (c) => c.text('Hello Hono!'))
	return app
}
