import Router from 'koa-router'
import passport from 'koa-passport'
import { applicationException } from '../../../helpers.js'

const router = new Router()

router.post('/register', (ctx) => {})

router.post('/login', passport.authenticate('local'), async (ctx) => {
	try {
		if (!ctx.isAuthenticated()) {
			throw new applicationException('Unhauthorized', 401)
		}
		ctx.body = 'Success!'
	} catch (e) {
		throw new applicationException(e.message, e.statusCode)
	}
})

export default router.routes()
