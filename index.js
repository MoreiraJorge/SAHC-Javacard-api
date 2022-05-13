import router from './src/routes/index.js'
import Koa from 'koa'
import dotenv from 'dotenv'
import cors from 'koa-cors'
import koaBody from 'koa-body'
import convert from 'koa-convert'
import passport from 'koa-passport'
import session from 'koa-session'

import { handleErrorAsync } from './helpers.js'

import './src/middleware/passport-strategies.js'

dotenv.config()

const PORT = process.env.SERVER_PORT || 4001
const SERVER_HOST = process.env.LOCAL_HOST || 'localhost'

const main = async () => {
	const app = new Koa()

	app.keys = ['super-secret-key']

	app
		.use(handleErrorAsync())
		.use(session(app))
		.use(convert(cors()))
		.use(convert(koaBody()))
		.use(passport.initialize())
		.use(passport.session())
		.use(router)

	app
		.listen(PORT, () => {
			console.log(`🚀 Server running on http://${SERVER_HOST}:${PORT}`)
		})
		.on('error', (err) => {
			console.log(err)
		})
}

main()
