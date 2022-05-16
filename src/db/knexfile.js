import dotenv from 'dotenv'
dotenv.config()

const HOST = process.env.DB_HOST || 'localhost'
const USER = process.env.DB_USER || 'root'
const PASSWORD = process.env.DB_PASSWORD || 'root'
const DATABASE = process.env.DB_DATABASE || 'sahc'

const options = {
	development: {
		client: 'mysql2',
		connection: {
			host: HOST,
			user: USER,
			password: PASSWORD,
			database: DATABASE,
		},
	},
}

export default options
