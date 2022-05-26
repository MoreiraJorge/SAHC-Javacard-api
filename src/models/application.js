import db from '../db/index.js'

class Application {
	async getAll(user) {
		return await db('applications')
			.select('application_name as applicationName')
			.select('id')
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

	async createPassword(data) {
		const { userId, applicationName, size, iv } = data

		return await db('applications').insert({
			user_id: userId,
			application_name: applicationName,
			cryptogram:'',
			size,
			iv,
		})
	}

	async updateCryptogram(data) {
		const { cryptogram, applicationName } = data

		return await db('applications').update({
			cryptogram
		}).where({
			application_name: applicationName
		})
	}

	async getCryptogramAndMetadata(application, user) {
		const result = await db('applications')
			.select('cryptogram')
			.select('iv')
			.select('size')
			.where({ application_name: application, user_id: user.id })
			.first()

		return result
	}
}

export default Application
