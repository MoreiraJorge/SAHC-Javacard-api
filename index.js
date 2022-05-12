import router from './routes/index.js'
import Koa from 'koa'
import dotenv from 'dotenv'
import cors from 'koa-cors'
import koaBody from 'koa-body'
import convert from 'koa-convert'
import { handleErrorAsync } from './helpers.js'

dotenv.config()

const PORT = process.env.SERVER_PORT || 4001
const SERVER_HOST = process.env.LOCAL_HOST

const main = async () => {
	const app = new Koa()

	app
		.use(handleErrorAsync())
		.use(convert(cors()))
		.use(convert(koaBody()))
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
