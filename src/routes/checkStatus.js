import Router from 'koa-router'
import passport from 'koa-passport'

const router = new Router()

/* router.post('/healthPost', (ctx) => {
	console.log(ctx.request.body)
	ctx.body = JSON.stringify(ctx.request.body)
	//throw new applicationException("Custom error", 404)
})
 */

router.get(
	'/health',
	passport.authenticate('jwt', { session: false }),
	async (ctx) => {
		ctx.body = 'Success!'
	},
)

export default router.routes()
