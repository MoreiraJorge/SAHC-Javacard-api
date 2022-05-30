import Router from 'koa-router'

const router = new Router()

router.get('/health', async (ctx) => {
	ctx.body = 'Success!'
})

export default router.routes()
