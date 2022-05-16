import db from '../db/index.js'

class User {
	async get(email) {
		return await db('users').where({ email }).first()
	}

	async insert(email, hash) {
		return await db('users').insert({ email, password: hash })
	}
}

export default User
