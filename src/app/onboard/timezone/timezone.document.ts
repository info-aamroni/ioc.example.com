import { createRoute, z } from '@hono/zod-openapi'
import { InvokePayloadSchema } from '@/app/onboard/timezone/timezone.schema.ts'
import {
	openapiDataSchema200,
	openapiDataSchema406,
	openapiDataSchema500,
	openapiHeadersSchema,
	openapiParamsSchema,
} from '@/utils/extra/schema.util.ts'

export const InvokeRouteDocument = createRoute({
	method: 'get',
	path: '/timezones',
	tags: ['Onboard Service'],
	summary: 'Get all timezones',
	description: 'Returns all timezones supported by the platform.',
	request: {
		params: openapiParamsSchema,
		headers: openapiHeadersSchema,
		query: z.object({
			search: z.string().optional().openapi({ example: 'Asia/Dhaka' }),
		}),
	},
	responses: {
		200: openapiDataSchema200(InvokePayloadSchema),
		406: openapiDataSchema406,
		500: openapiDataSchema500,
	},
})
