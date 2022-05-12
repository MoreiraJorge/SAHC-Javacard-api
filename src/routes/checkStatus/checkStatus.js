import Router from 'koa-router'
import { applicationException } from '../../../helpers.js'
const router = new Router()

router.post('/healthPost', (ctx) => {
	console.log(ctx.request.body)
	ctx.body = JSON.stringify(ctx.request.body)
	//throw new applicationException("Custom error", 404)
})

router.get('/health', () => {
	throw applicationException('Custom error', 500)
})

export default router.routes()