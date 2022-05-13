import Router from 'koa-router'

const router = new Router()

/* router.post('/healthPost', (ctx) => {
	console.log(ctx.request.body)
	ctx.body = JSON.stringify(ctx.request.body)
	//throw new applicationException("Custom error", 404)
})
 */

router.post('/health', async (ctx) => {
	ctx.body = 'Success!'
})

export default router.routes()
