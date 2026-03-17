import { z } from '@hono/zod-openapi'

export const InvokePayloadSchema = z.object({
	title: z.string().openapi({ example: 'Asia/Dhaka' }),
	value: z.string().openapi({ example: 'GMT(+06:00)' }),
})
