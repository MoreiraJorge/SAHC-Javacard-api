import Router from 'koa-router'
const router = new Router()

router.post('/healthPost', (ctx) => {
	console.log(ctx.request.body)
	ctx.body = JSON.stringify(ctx.request.body)
	//throw new applicationException("Custom error", 404)
})

router.get('/health', (ctx) => {
	ctx.body = 'Im Healthy'
	ctx.status = 200
	//throw applicationException('Custom error1', 500)
})

export default router.routes()
