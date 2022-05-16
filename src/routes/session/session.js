import Router from 'koa-router'
import passport from 'koa-passport'
import jwt from 'jsonwebtoken'
import { applicationException } from '../../helpers.js'

const router = new Router()

router.post('/register', (ctx) => {})

router.post('/login', passport.authenticate('local'), async (ctx) => {
	try {
		if (!ctx.isAuthenticated()) {
			throw new applicationException('Unhauthorized', 401)
		}
		const token = jwt.sign({ id: 1, name: 'Test token' }, 'secret')
		ctx.body = token
	} catch (e) {
		throw new applicationException(e.message, e.statusCode)
	}
})

export default router.routes()
