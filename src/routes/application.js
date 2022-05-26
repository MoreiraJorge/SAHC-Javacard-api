import Router from 'koa-router'
import { applicationException, asciiToHex, numberToHex, getCipherSize, buffToHex } from '../helpers.js'
import { Application } from '../models/index.js'
import passport from 'koa-passport'
import generator from 'generate-password'
import crypto from 'crypto'

const router = new Router()

router.get('/test', (ctx) => {
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
			const cryptogram = await Application.getCryptogramAndMetadata(applicationName, user)
			
			const hexIv = buffToHex(cryptogram?.iv);
			const ivSize = numberToHex(hexIv.split(' ').length);
			const result = buffToHex(cryptogram?.cryptogram)
			const cryptogramSize = numberToHex(result.split(' ').length)
			const hexSize = numberToHex(Number(cryptogram?.size));
			ctx.body =  {
				initIvAPDU: `0x80 0x12 0x00 0x00 ${ivSize} ${hexIv} 0X00;`,
				decryptAPDU: `0x80 0x11 0x01 0x18 ${cryptogramSize} ${result} ${hexSize};`,
			}

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

			const iv = crypto.randomBytes(8)
			const formattedIv = buffToHex(iv.toString('hex'))

			if (applicationName) {
				await Application.createPassword({
					userId,
					applicationName,
					size: tempPassword.length,
					iv: iv.toString('hex'),
				})
				
				ctx.body =  {
					initIvAPDU: `0x80 0x12 0x00 0x00 ${numberToHex(iv.length)} ${formattedIv} 0X00;`,
					encryptAPDU: `0x80 0x11 0x00 0x00 ${numberToHex(tempPassword.length)} ${asciiToHex(tempPassword)} ${numberToHex(getCipherSize(tempPassword.length))};`
				}
				ctx.status = 200
			}
		} catch (e) {
			throw new applicationException(e.message, 404)
		}
	},
)

router.put(
	'/:id/cryptogram',
	passport.authenticate('jwt', { session: false }),
	async (ctx) => {
		try {
			const { id } = ctx.params
			const user = ctx.state.user
			const { applicationName, cryptogram } = ctx.request.body

			const application = await Application.getApplicationByUser(id, user)

			if (!application) {
				throw new applicationException(
					'You cannot update this application!',
					404,
				)
			}

			if (applicationName) {
				await Application.updateCryptogram({
					applicationName,
					cryptogram: cryptogram.replace(/,|\s/g, "").trim()
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
