import Router from 'koa-router'
import passport from 'koa-passport'

const router = new Router()

/* router.post('/healthPost', (ctx) => {
	console.log(ctx.request.body)
	ctx.body = JSON.stringify(ctx.request.body)
	//throw new applicationException("Custom error", 404)
})
 */

//usar passport.authenticate('jwt', { session: false }) para proteger com token
router.get('/health', async (ctx) => {
	ctx.body = 'Success!'
})

export default router.routes()
