import Router from 'koa-router'
import passport from 'koa-passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../../models/index.js'

import { applicationException } from '../../helpers.js'

const router = new Router()

router.post('/register', async (ctx) => {
	try {
		const newUser = ctx.request.body

		const user = await User.get(newUser.email)
		if (user) {
			throw new applicationException('An error occured', 500)
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(newUser.password, salt)

		await User.insert(newUser.email, hash)

		ctx.body = 'Success!'
		ctx.status = 200
	} catch (e) {
		throw applicationException(e.message, e.statusCode)
	}
})

router.post('/login', passport.authenticate('local'), async (ctx) => {
	try {
		if (!ctx.isAuthenticated()) {
			throw new applicationException('Unhauthorized', 401)
		}

		const user = ctx.state.user
		const token = jwt.sign({ email: user.email }, 'secret')

		ctx.body = { token: token }
		ctx.status = 200
	} catch (e) {
		throw new applicationException(e.message, e.statusCode)
	}
})

export default router.routes()
