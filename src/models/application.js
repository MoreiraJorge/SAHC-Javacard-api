import db from '../db/index.js'

class Application {
	test() {
		console.log('Hello!!')
	}

	async getAll() {
		//Todo: filter by session user
		return await db('applications').select(
			'application_name as applicationName',
			'username',
			'application_link as applicationLink',
		)
	}

	async createCryptogram(data) {
		const { userId, applicationName, cryptogram } = data

		return await db('applications').insert({
			user_id: userId,
			application_name: applicationName,
			cryptogram,
		})
	}

	async getCryptogram(application) {
		// TODO: Filter by user
		const { cryptogram } = await db('applications')
			.select('cryptogram')
			.where({ application_name: application })
			.first()

		return cryptogram
	}
}

export default Application
