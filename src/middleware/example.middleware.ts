import { Context, Next } from "hono"

export const ExampleMiddleware = async (ctx: Context, next: Next) => {
    ctx.header('x-example-middleware', 'true')
    await next()
}