import Router from 'koa-router'
import { applicationException } from '../../helpers.js'
const router = new Router()
import db from '../../db/index.js'

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

router.get('/test', async (ctx) => {
	const todos = await db('users')

	ctx.body = { todos }
	ctx.status = 200
	//throw applicationException('Custom error1', 500)
})

export default router.routes()
