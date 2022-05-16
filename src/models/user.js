import db from '../db/index.js'

class User {
	async get(email) {
		return await db('users').where({ email }).first()
	}
}

export default User
