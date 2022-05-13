// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const HOST = process.env.SERVER_PORT || 4001
const USER = process.env.LOCAL_HOST || 'root'
const PASSWORD = process.env.LOCAL_HOST || 'root'
const DATABASE = process.env.LOCAL_HOST || 'sahc'

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
