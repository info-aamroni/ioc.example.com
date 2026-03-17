import { Hono } from 'hono'
import { OnboardProvider } from '@/app/onboard/onboard.provider.ts'

const app = new Hono()

OnboardProvider.register(app, '/api')

app.get('/', (c) => c.text('Hello Hono!'))

export default app
