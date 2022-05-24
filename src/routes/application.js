import Router from 'koa-router'
import { applicationException } from '../helpers.js'
import { Application } from '../models/index.js'
import passport from 'koa-passport'
import generator from 'generate-password'
import crypto from 'crypto'

const router = new Router()

router.get('/test', (ctx) => {
	console.log(ctx.params)
	ctx.body = 'test'
	ctx.status = 200
})

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (ctx) => {
		try {
			const user = ctx.state.user
			const applications = await Application.getAll(user)

			ctx.body = applications || []
			ctx.status = 200
		} catch (e) {
			throw new applicationException(e.message, 404)
		}
	},
)

router.get(
	'/:applicationName/cryptogram',
	passport.authenticate('jwt', { session: false }),
	async (ctx) => {
		try {
			const user = ctx.state.user
			const { applicationName } = ctx.params
			const cryptogram = await Application.getCryptogram(applicationName, user)

			ctx.body = { cryptogram }
			ctx.status = 200
		} catch (e) {
			throw new applicationException(e.message, 404)
		}
	},
)

router.post(
	'/password',
	passport.authenticate('jwt', { session: false }),
	async (ctx) => {
		try {
			const { id: userId } = ctx.state.user
			const { applicationName, password } = ctx.request.query
			let tempPassword

			if (password) {
				if (password.length > 32) {
					throw new applicationException(
						'Password must be lower that 32 characters.',
						404,
					)
				}

				tempPassword = password
			} else {
				tempPassword = generator.generate({
					length: 16,
					numbers: true,
					symbols: true,
					lowercase: true,
					uppercase: true,
					exclude: '{}[]',
				})
			}

			const iv = crypto.randomBytes(16)

			if (applicationName) {
				//TODO: Check if card is connected otherwise throw error
				//TODO: Request to card to encrypt password and save cryptogram
				await Application.createCryptogram({
					userId,
					applicationName,
					cryptogram: tempPassword,
					size: tempPassword.length,
					iv: iv.toString('hex'),
				})

				ctx.status = 200
			}
		} catch (e) {
			throw new applicationException(e.message, 404)
		}
	},
)

router.del(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	async (ctx) => {
		try {
			const { id } = ctx.params
			const user = ctx.state.user

			const application = await Application.getApplicationByUser(id, user)

			if (!application) {
				throw new applicationException(
					'You cannot delete this application!',
					404,
				)
			}

			await Application.deleteApplication(id)
			ctx.status = 200
		} catch (e) {
			throw new applicationException(e.message, 404)
		}
	},
)

export default router.routes()
