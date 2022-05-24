import db from '../db/index.js'

class Application {
	async getAll(user) {
		return await db('applications')
			.select('application_name as applicationName')
			.where({ user_id: user.id })
	}

	async getApplicationByUser(id, user) {
		return await db('applications')
			.select('application_name as applicationName')
			.where({ id, user_id: user.id })
			.first()
	}

	async deleteApplication(id) {
		await db('applications').where({ id }).del()
	}

	async createCryptogram(data) {
		const { userId, applicationName, cryptogram, size, iv } = data

		return await db('applications').insert({
			user_id: userId,
			application_name: applicationName,
			cryptogram,
			size,
			iv,
		})
	}

	async getCryptogram(application, user) {
		const result = await db('applications')
			.select('cryptogram')
			.where({ application_name: application, user_id: user.id })
			.first()

		return result?.cryptogram
	}
}

export default Application
