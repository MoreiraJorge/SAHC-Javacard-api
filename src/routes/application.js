import Router from 'koa-router'
import db from '../db/index.js'
import { applicationException } from '../helpers.js'
import { Application } from '../models/index.js'

const router = new Router()

router.get('/test', (ctx) => {
	console.log(ctx.params)
	ctx.body = 'test'
	ctx.status = 200
})

router.get('/', async (ctx) => {
	try {
		const applications = await Application.getAll()

		ctx.body = applications || []
		ctx.status = 200
	} catch (e) {
		throw new applicationException(e.message, 404)
	}
})

router.get('/:applicationName/cryptogram', async (ctx) => {
	try {
		const { applicationName } = ctx.params
		const cryptogram = await Application.getCryptogram(applicationName)

		ctx.body = { cryptogram }
		ctx.status = 200
	} catch (e) {
		throw new applicationException(e.message, 404)
	}
})

router.post('/password', async (ctx) => {
	try {
		const { applicationName, password } = ctx.request.query

		//TODO: Check if card is connected otherwise throw error
		if (applicationName) {
			//TODO: Request to card to encrypt password and save cryptogram
			//TODO: Get user id
			await Application.createCryptogram({
				userId: 1,
				applicationName,
				cryptogram: password,
			})

			ctx.status = 200
		}
	} catch (e) {
		throw new applicationException(e.message, 404)
	}
})

router.del('/:id', async (ctx) => {
	try {
		const { id } = ctx.params

		//TODO: Check if it belongs to user
		await db('applications').where({ id }).del()

		ctx.status = 200
	} catch (e) {
		throw new applicationException(e.message, 404)
	}
})

export default router.routes()
